import { Scene, Vector3, Ray, TransformNode, Mesh, Color3, Color4, UniversalCamera, Quaternion, AnimationGroup, ExecuteCodeAction, ActionManager, ParticleSystem, Texture, SphereParticleEmitter, Sound, Observable, ShadowGenerator, Logger } from "@babylonjs/core";

export class AudioController {
    public scene: Scene;

    private _soundArray = [];
    private _peraTeleportVo : Sound [];
    private _audioIndex: number = 0;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    public async _loadSound(scene: Scene) {
        this._peraTeleportVo = [
            new Sound("peraTeleportVoice1", "./sounds/voiceover/Pera_Teleport1.mp3", scene),
            new Sound("peraTeleportVoice2", "./sounds/voiceover/Pera_Teleport1.mp3", scene),
            new Sound("peraTeleportVoice3", "./sounds/voiceover/Pera_Teleport1.mp3", scene)
        ];

        Logger.Warn("sound count is" + this._peraTeleportVo.length);
    }

    //TODO make a listener to player inputs
    public playSoundOnPlayerInput(): void {
        Logger.Warn("name is " + this._peraTeleportVo[this._audioIndex].name);
        this._peraTeleportVo[1].play();
        //this._playSoundOnPlayerInput(this._peraTeleportVo[this._audioIndex] as Sound);
        this._audioIndex++;
    }


    private _playSoundOnPlayerInput(sound: Sound): void {
        Logger.Warn("sound name is ");
        sound.play();
    }
}