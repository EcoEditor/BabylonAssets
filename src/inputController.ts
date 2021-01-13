import { Scene, ActionManager, ExecuteCodeAction, Observer, Scalar, Logger } from '@babylonjs/core';

export class PlayerInput {
    public inputMap: any;

    private _scene: Scene;

    public jumpKeyDown: boolean;

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
    }

    private _updateFromKeyboard(): void {
        if ((this.inputMap[" "])) {
            this.jumpKeyDown = true;
        } else {
            this.jumpKeyDown = false;
        }
    }

}