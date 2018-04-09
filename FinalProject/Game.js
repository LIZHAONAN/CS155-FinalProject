var scene, renderer;
var camera;
var table;

init();
animate();

function init(){
  initScene();
  initPhysijs();
  initRenderer();
  createGameScene();
}

function initScene(){
  scene = new THREE.Scene();
}

function createGameScene(){
  var amlight = new THREE.AmbientLight( 0xffffff,0.25);
  scene.add(amlight);
  var light = createPointLight();
  light.position.set(10,10,50);
  scene.add(light);

  camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(0,50,100);
  camera.lookAt(0,0,0);

  var floor = createGround('wood.jpg');
  floor.position.set(-10,-10,0);
  scene.add(floor);

  var poolTable = createTable();
  scene.add(poolTable);
}

function createTable(){
  console.log("Creating table!");
  var loader = new THREE.OBJLoader();
  loader.load("../models/PoolTable.obj",
        function ( geometry, materials ) {
          var material =
          new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
          var pmaterial = new Physijs.createMaterial(material, 0.9, 0.5);
          table = new Physijs.BoxMesh( geometry, pmaterial );
          var s = 3;
          table.scale.y=s;
          table.scale.x=s;
          table.scale.z=s;
          table.castShadow = true;
          table.setDamping(0.1,0.1);

          table.position.set(0,0,0);
          scene.add(table);
          return table;
        },
        function(xhr){
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );},
        function(err){console.log("error in loading: "+err);}
      )
}

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


function initPhysijs(){
  Physijs.scripts.worker = '/js/physijs_worker.js';
  Physijs.scripts.ammo = '/js/ammo.js';
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

function animate(){
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
