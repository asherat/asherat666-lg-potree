var firstFlipYZ = sceneProperties.flipYZ;

var isFlipYZ = false;
function flipYZ(){
	
	isFlipYZ = !isFlipYZ;
	
	if(isFlipYZ){
		referenceFrame.matrix.copy(new THREE.Matrix4());
		referenceFrame.applyMatrix(new THREE.Matrix4().set(
			1,0,0,0,
			0,0,1,0,
			0,-1,0,0,
			0,0,0,1
		));
		
	}else{
		referenceFrame.matrix.copy(new THREE.Matrix4());
		referenceFrame.applyMatrix(new THREE.Matrix4().set(
			1,0,0,0,
			0,1,0,0,
			0,0,1,0,
			0,0,0,1
		));
	}
	
	referenceFrame.updateMatrixWorld(true);
	pointcloud.updateMatrixWorld();
	var sg = pointcloud.boundingSphere.clone().applyMatrix4(pointcloud.matrixWorld);
	referenceFrame.position.copy(sg.center).multiplyScalar(-1);
	referenceFrame.updateMatrixWorld(true);
	referenceFrame.position.y -= pointcloud.getWorldPosition().y;
	referenceFrame.updateMatrixWorld(true);
}

var defaultPointSize = 0.03;
var defaultLOD = 15;
var pointcloudPath;
var pointclouds = [];
var render;
var visnodes;
var controls;

var stats;
var fov = sceneProperties.fov;
var pointSize = sceneProperties.pointSize;
var pointCountTarget = sceneProperties.pointLimit;
var opacity = 1;
var pointSizeType = null;
var pointColorType = null;
var pointShape = Potree.PointShape.SQUARE;
var clipMode = Potree.ClipMode.HIGHLIGHT_INSIDE;
var quality = null;

var useDEMCollisions = false;
var minNodeSize = 100;
var directionalLight;


var showStats = false;
var showBoundingBox = false;
var freeze = false;

var progressBar = new ProgressBar();
var snControls;
function useSpacenavControls(){}
var controls;
var pointcloudPath = sceneProperties.path;
var elRenderArea = document.getElementById("renderArea");
 var changeEvent = function(event) {
            newPosition = event.target.object.position;
            newRotation = event.target.object.rotation;
        }
function initGUI(){}
var showSkybox = false;
var snControls;

 var PotreeRenderer = function(){

	this.render = function(){
		{// resize
			var width = elRenderArea.clientWidth;
			var height = elRenderArea.clientHeight;
			var aspect = width / height;
			
			camera.aspect = aspect;
			camera.updateProjectionMatrix();
			
			renderer.setSize(width, height);
		}
		

		// render skybox
		if(showSkybox){
			skybox.camera.rotation.copy(camera.rotation);
			renderer.render(skybox.scene, skybox.camera);
		}else{
			renderer.render(sceneBG, cameraBG);
		}
		
		if(renderer.pointcloud){
			if(pointcloud.originalMaterial){
				pointcloud.material = pointcloud.originalMaterial;
			}
			
			var bbWorld = Potree.utils.computeTransformedBoundingBox(pointcloud.boundingBox, pointcloud.matrixWorld);
			
			pointcloud.visiblePointsTarget = pointCountTarget * 1000 * 1000;
			pointcloud.material.size = pointSize;
			pointcloud.material.opacity = opacity;
			pointcloud.material.pointColorType = pointColorType;
			pointcloud.material.pointSizeType = pointSizeType;
			pointcloud.material.pointShape = (quality === "Circles") ? Potree.PointShape.CIRCLE : Potree.PointShape.SQUARE;
			pointcloud.material.interpolate = (quality === "Interpolation");
			pointcloud.material.weighted = false;
		}
		
		// render scene
		renderer.render(scene, camera);
		renderer.render(scenePointCloud, camera);
		renderer.clearDepth();
	};
};
var potreeRenderer = new PotreeRenderer();

THREE.lg_init('appname', undefined, undefined, undefined, undefined, false)
initGUI();