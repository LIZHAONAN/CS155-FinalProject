var scene, renderer;
var camera, skyCam;
var table;

var controls = {camera:camera}
var state =
     {scene:'main', camera:'none' }

init();
initControls();
animate();

function init(){
  initPhysijs();
  initScene();
  initRenderer();
  createGameScene();
}

function initScene(){
  scene = new Physijs.Scene();
}

function createGameScene(){
  var amlight = new THREE.AmbientLight( 0xffffff,1);
  scene.add(amlight);
  var light = createPointLight();
  light.position.set(10,10,50);
  scene.add(light);

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0,50,100);
  camera.lookAt(0,0,0);

  skyCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  skyCam.position.set(0,150,0);
  skyCam.lookAt(0,0,0);

  var floor = createGround('wood.jpg');
  floor.position.set(-10,10,0);
  scene.add(floor);

  //table = createTable();

  addBalls();
}

/*
function createTable(){
  console.log("Creating table!");

  var loader = new THREE.OBJLoader();
  loader.load("../models/PoolTable.obj",
        function ( object ) {
          //var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
          //var pmaterial = new Physijs.createMaterial(material, 0,9, 0.5);
          //table = new Physijs.BoxMesh( object, pmaterial);
          table = object;
          console.dir(table);
          var s = 50;
          table.scale.y=s;
          table.scale.x=s;
          table.scale.z=s;
          table.castShadow = true;

          table.position.set(0,0,0);
          scene.add(table);
          return table;
        },
        function(xhr){
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
        function(err){console.log("error in loading: "+err);}
      )
  }
*/
/*	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};
	var onError = function ( xhr ) { };

  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath( '/models/PoolTable/' );
  mtlLoader.setPath( '/models/' );
  var url = "PoolTable.mtl";
  mtlLoader.load( url, function( materials ) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath( '/models/' );
    objLoader.load( 'PoolTable.obj', function ( object ) {

        object.position.y = - 95;
        scene.add( object );

    }, onProgress, onError );

});*/


function createGround(image){
  var geometry = new THREE.PlaneGeometry( 180, 180, 128 );
  var texture = new THREE.TextureLoader().load( '../images/'+image );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 15, 15 );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.05);
  var mesh = new Physijs.BoxMesh( geometry, pmaterial, 0 );

  mesh.receiveShadow = true;

  mesh.rotateX(Math.PI/2);
  return mesh;
}

function createBall(color){
  var geometry = new THREE.SphereGeometry( 3, 20, 20);
  var material = new THREE.MeshLambertMaterial( { color: color} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.95);
  var mesh = new Physijs.SphereMesh( geometry, pmaterial );
  mesh.setDamping(0.1,0.1);
  mesh.castShadow = true;
  return mesh;
}

function addBalls(){
  var redBall=createBall(0xff0000);
  redBall.position.set(0,50,10);

  var whiteBall=createBall(0x00ffff);
  whiteBall.position.set(0,60,0);

  scene.add(redBall);
  scene.add(whiteBall);
  console.log("bal hit the cone");


  redBall.addEventListener( 'collision',
    function( other_object, relative_velocity, relative_rotation, contact_normal ) {
        if(other_object = whiteBall){
          console.log("bal hit the cone");
        }
        this.__dirtyPosition = true;
    }
  )
}

function initPhysijs(){
  Physijs.scripts.worker = '/js/physijs_worker.js';
  Physijs.scripts.ammo = '/js/ammo.js';
  console.dir(Physijs.scripts);
}

function initRenderer(){
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight-50 );
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

function createPointLight(){
  var light;
  light = new THREE.PointLight( 0xffffff);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;  // default
  light.shadow.mapSize.height = 2048; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 500      // default
  return light;
}

var clock;

function initControls(){

    clock = new THREE.Clock();
    clock.start();

    window.addEventListener( 'keydown', keydown);
    window.addEventListener( 'keyup',   keyup );
}

function keydown(event){
  console.dir(event);

  switch (event.key){
    case "1": state.camera=camera; break;
    case "2": state.camera=skyCam;
      console.log("camera changed");
    break;
  }

}

function keyup(event){
  switch (event.key){

  }
}

function animate(){
  requestAnimationFrame( animate );
  scene.simulate();


  switch(state.scene) {

    case "main":
      if (state.camera!= 'none'){
        renderer.render( scene, state.camera );
      }
      break;

    default:
      console.log("don't know the scene "+state.scene);

  }
}
