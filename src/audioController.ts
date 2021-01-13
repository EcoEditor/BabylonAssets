import { Scene, Vector3, Ray, TransformNode, Mesh, Color3, Color4, UniversalCamera, Quaternion, AnimationGroup, ExecuteCodeAction, ActionManager, ParticleSystem, Texture, SphereParticleEmitter, Sound, Observable, ShadowGenerator, Logger } from "@babylonjs/core";

export class AudioController {
    public scene: Scene;

    private _clappingSound: Sound;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public async loadAsync() {
        var applauseAsync = new Promise<Sound>((resolve) => {
            //const sound = new Sound("claps", "https://raw.githubusercontent.com/EcoEditor/BabylonRepoForQuestion/master/Board%20Room%20Applause%2001.wav", this.scene, () => { resolve(sound) });
            const sound = new Sound("claps", "./sounds/voiceover/Pera_Teleport1.mp3", this.scene, () => { resolve(sound) });
        });

        this._clappingSound = await applauseAsync;
    }

    public async PlaySound() {
        Logger.Log("sound is ready? " + this._clappingSound.isReady());
        this._clappingSound.play();
    }
}



