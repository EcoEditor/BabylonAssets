import { Scene, ActionManager, ExecuteCodeAction, Observer, Scalar, Logger } from '@babylonjs/core';
import { AudioController } from "./audioController";

export class PlayerInput {
    public inputMap: any;

    private _scene: Scene;

    public jumpKeyDown: boolean;


    private _audioController: AudioController;

    constructor(scene: Scene) {
        this._scene = scene;
        this._scene.actionManager = new ActionManager(this._scene);
        this.inputMap = {};
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        this._scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
            this.inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        //add to the scene an observable that calls updateFromKeyboard before rendering
        scene.onBeforeRenderObservable.add(() => {
            this._updateFromKeyboard();
        });

        this._audioController = new AudioController(this._scene);

    }

    private _updateFromKeyboard(): void {
        if ((this.inputMap[" "])) {
            this.jumpKeyDown = true;
            this._audioController.soundName();
            Logger.Log("is sound ready? " + this._audioController.soundReady());
        } else {
            this.jumpKeyDown = false;
        }
    }

}