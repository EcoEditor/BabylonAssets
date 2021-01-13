import { Scene, Vector3, Ray, TransformNode, Mesh, Color3, Color4, UniversalCamera, Quaternion, AnimationGroup, ExecuteCodeAction, ActionManager, ParticleSystem, Texture, SphereParticleEmitter, Sound, Observable, ShadowGenerator, Logger } from "@babylonjs/core";

export class AudioController {
    public scene: Scene;

    private _peraTeleportVo : Sound [];
    private _audioIndex: number = 0;

    constructor(scene: Scene) {
        this.scene = scene;
        this._loadSound();
    }

    public async _loadSound() {
        this._peraTeleportVo = [
            new Sound("peraTeleportVoice1", "./sounds/voiceover/Pera_Teleport1.mp3", this.scene),
            new Sound("peraTeleportVoice2", "./sounds/voiceover/Pera_Teleport1.mp3", this.scene),
            new Sound("peraTeleportVoice3", "./sounds/voiceover/Pera_Teleport1.mp3", this.scene)
        ];

        Logger.Log("sound count is" + this._peraTeleportVo.length);
    }

    public async checkIfReady() {

    }

    private _playSoundOnPlayerInput(sound: Sound): void {
        Logger.Warn("sound name is ");
        sound.play();
    }
}