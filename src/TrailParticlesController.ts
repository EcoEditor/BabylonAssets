import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Scene, Logger,  Vector3, Mesh, Texture, Color4, PBRMetallicRoughnessMaterial, MeshBuilder, ParticleSystem, Curve3, Path3D, Axis, Animation, Space, Material, AnimationGroup } from "@babylonjs/core";

export class TrailParticlesController {
    public scene: Scene;
    private _sphere: Mesh;
    private _trailVfx: ParticleSystem;

    //Splines
    private _firstSpline: Curve3;
    private _secondSpline: Curve3;
    private _thirdSpline: Curve3;

    //Spline mesh
    private _firstSplineMesh: Mesh;
    private _secondSplineMesh: Mesh;
    private _thirdSplineMesh: Mesh;

    //Spawn trail positions
    private _firstSpawnPosition: Vector3;
    private _secondSpawnPosition: Vector3;
    private _thirdSpawnPosition: Vector3;

    constructor(scene: Scene) {
        this.scene = scene;

    }

    private _defineParticleSystemTrail(): void {
        const ground = MeshBuilder.CreateGround("ground", { width: 25, height: 25 });
        ground.material = new PBRMetallicRoughnessMaterial("groundMat", this.scene);
        ground.material.backFaceCulling = false;
        ground.position.y = -0.5;

        // Sphere
        const sphere = MeshBuilder.CreateSphere("sphere", {});
        // make sphere invisible
        sphere.layerMask = 0;

        const particleSystem = new ParticleSystem("trail_particles", 1000, this.scene, null, true);
        particleSystem.particleTexture = new Texture("textures/vfx/Fire_SpriteSheet2_8x8.png", this.scene, true, false);
        particleSystem.isAnimationSheetEnabled = true;
        particleSystem.billboardMode = ParticleSystem.BILLBOARDMODE_ALL;
        particleSystem.blendMode = ParticleSystem.BLENDMODE_ADD;

        particleSystem.startSpriteCellID = 0;
        particleSystem.endSpriteCellID = 4;
        particleSystem.spriteCellHeight = 128;
        particleSystem.spriteCellWidth = 129;
        particleSystem.beginAnimationLoop = true;

        //Color
        particleSystem.color1 = new Color4(0.620, 0.596, 0.498, 0.494);
        particleSystem.color2 = new Color4(0.431, 0.424, 0.353, 1);
        particleSystem.colorDead = new Color4(0, 0, 0, 0);

        //Emission
        particleSystem.emitter = sphere; // the starting object, the emitter
        particleSystem.minEmitBox = new Vector3(-0.1, 0, -0.1); // Starting all from
        particleSystem.maxEmitBox = new Vector3(0.1, 0, 0.1); // To...

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.2;

        // Lifetime of each particle (random between...
        particleSystem.minLifeTime = 15;
        particleSystem.maxLifeTime = 25;

        // Emission rate
        particleSystem.emitRate = 500;

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new Vector3(-0.1, 0, -0.1);
        particleSystem.direction2 = new Vector3(0.1, 0, 0.1);


        // Speed -low power, higher speed to match sprite animation
        particleSystem.minEmitPower = 0.1;
        particleSystem.maxEmitPower = 0.1;
        particleSystem.updateSpeed = 0.1;

        this._trailVfx = particleSystem;
        this._sphere = sphere;
    }

    private _defineSplinesTrails(): void {
        var numOfPointsBetween = 50;
        //First spline
        var firstSplinePoints: Array<Vector3> = [
            new Vector3(-0.21, 1.6, 0.84),
            new Vector3(-2.29, 1.6, 2.46),
            new Vector3(-2.61, 1.6, 5.29),
            new Vector3(0.85, 1.6, 6.43)
        ]

        var firstSpline = Curve3.CreateCatmullRomSpline(firstSplinePoints, numOfPointsBetween);
        var firstSplineMesh = Mesh.CreateLines("FirstSpline", firstSpline.getPoints(), this.scene);
        firstSplineMesh.position = new Vector3(-2.635, 0, 1.101);
        firstSplineMesh.rotation.y = Math.PI / 4;
        // TODO: Uncomment this line to make line invisible - use gizmoz
        //firstSplineMesh.layerMask = 0;

        //Second spline
        var secondSplinePoints: Array<Vector3> = [
            new Vector3(0.16, 1.6, 0.73),
            new Vector3(0.8, 1.6, 3),
            new Vector3(3.1, 1.6, 3.19),
            new Vector3(4.45, 1.6, 1.9),
            new Vector3(4.78, 1.6, 1.96),
            new Vector3(4.77, 1.6, 2.35)
        ]

        var secondSpline = Curve3.CreateCatmullRomSpline(secondSplinePoints, numOfPointsBetween);
        var secondSplineMesh = Mesh.CreateLines("SecondSpline", secondSpline.getPoints(), this.scene);
        secondSplineMesh.position = new Vector3(1.199, 0, 4.675);
        secondSplineMesh.rotation.y = Math.PI / 2;
        // TODO: use gizmoz
        //secondSplineMesh.layerMask = 0;


        //Third Spline:
        var thirdSplinePoints: Array<Vector3> = [
            new Vector3(3.33, 1.6, 2.57),
            new Vector3(1.74, 1.6, -0.03),
            new Vector3(0.49, 1.6, 1.69),
            new Vector3(-1.43, 1.6, 2.33),
            new Vector3(-0.78, 1.6, 3.71)
        ]

        var thirdSpline = Curve3.CreateCatmullRomSpline(thirdSplinePoints, numOfPointsBetween);
        var thirdSplineMesh = Mesh.CreateLines("ThirdSpline", thirdSpline.getPoints(), this.scene);
        thirdSplineMesh.position = new Vector3(-2.112, 0, -2.694);
        thirdSplineMesh.rotation.y = Math.PI / 8;
        // TODO: use gizmoz
        //thirdSplineMesh.layerMask = 0;

        this._firstSpline = firstSpline;
        this._secondSpline = secondSpline;
        this._thirdSpline = thirdSpline;

        this._firstSplineMesh = firstSplineMesh;
        this._secondSplineMesh = secondSplineMesh;
        this._thirdSplineMesh = thirdSplineMesh;

        this._firstSpawnPosition = firstSplinePoints[0];
        this._secondSpawnPosition = secondSplinePoints[0];
        this._thirdSpawnPosition = thirdSplinePoints[0];
    }

    private async _prepareTrailEffect(spline: Curve3, splineMesh: Mesh, startPosition: Vector3) {
        this._sphere.setParent(splineMesh);
        this._sphere.position = startPosition;

        var pathPoints = spline.getPoints();
        Logger.Warn("path point count" + pathPoints.length);
        var numberOfPoints = pathPoints.length;
        var path3d = new Path3D(pathPoints);
        var normals = path3d.getNormals();

        var theta = Math.acos(Vector3.Dot(Axis.Z, normals[0]));

        //TODO delete if not used:
        //var i = 0;

        //this.scene.registerAfterRender(function () {
        //    this._sphere.position = pathPoints[i];

        //    theta = Math.acos(Vector3.Dot(normals[i], normals[i + 1]));
        //    var direction = Vector3.Cross(normals[i], normals[i + 1]).y;
        //    var direction = direction / Math.abs(direction);

        //    this._sphere.rotate(Axis.Y, direction * theta, Space.WORLD);

        //    i = (i + 1) % (numberOfPoints - 1);
        //});

        //TODO delete after debugging - currently not used
        //for (var i = 0; i < numberOfPoints; i++) {
        //    this.scene.registerAfterRender(function () {
        //        this._sphere.position = this.pathPoints[i];

        //        theta = Math.acos(Vector3.Dot(normals[i], normals[i + 1]));
        //        var directionCross = Vector3.Cross(normals[i], normals[i + 1]).y;
        //        var direction = direction / Math.abs(directionCross);

        //        this._sphere.rotate(Axis.Y, direction * theta, Space.WORLD);
        //    });
        //}

        //TODO Animate movement on spline (use if for loop is not working ever....)
        var animationPosition = new Animation("animationPosition", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
        var animationRotation = new Animation("animationRotation", "rotation", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);

        // Add binormals and tangets vars for animation
        var binormals = path3d.getBinormals();
        var tangents = path3d.getTangents();


        var keysPosition = [];
        var keysRotation = [];

        for (var i = 0; i < numberOfPoints; i++) {
            keysPosition.push({
                frame: i,
                value: spline.getPoints()[i]
            });

            keysRotation.push({
                frame: i,
                value: Vector3.RotationFromAxis(normals[i], binormals[i], tangents[i])
            });
        }

        animationPosition.setKeys(keysPosition);
        animationRotation.setKeys(keysRotation);

        //create the animation group
        var animationGroup = new AnimationGroup("AnimationGroup");
        animationGroup.addTargetedAnimation(animationPosition, this._sphere);
        animationGroup.addTargetedAnimation(animationRotation, this._sphere);

        animationGroup.play(true);

        this._trailVfx.start();
    }



    public async playTrailEffect() {
        this._defineParticleSystemTrail();
        this._defineSplinesTrails();
        await this._prepareTrailEffect(this._firstSpline, this._firstSplineMesh, this._firstSpawnPosition);
    }
}