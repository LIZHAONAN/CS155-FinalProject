var scene, renderer;
var camera, skyCam, avatarCam;
var table;
var avatar;

var whiteBall_control = {speed:0};

var controls =
  {fwd:false, bwd:false, left:false, right:false,
   speed:10}
var gameState =
     {scene:'main', camera:'none' }

init();
initControls();
animate();

function init(){
  initPhysijs();
  scene = initScene();
  initRenderer();
  createGameScene();
  createTable();
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

  avatarCam = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
  avatar = createAvatar();
  avatar.translateY(20);
  avatarCam.translateY(-4);
  avatarCam.translateZ(3);
  scene.add(avatar);
  gameState.camera = avatarCam;

  skyCam = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  skyCam.position.set(0,150,50);
  gameState.camera = skyCam;

	var yellowBall=createBall(0xffff00);
  yellowBall.position.set(0,15,-20);
  scene.add(yellowBall);  console.dir(yellowBall)

  var redBall=createBall(0xff0000);
  redBall.position.set(3,15,-26);
  scene.add(redBall);

  var purpleBall=createBall(0x4B0082);
  purpleBall.position.set(-3,15,-26);
  scene.add(purpleBall);

  var redBall2=createBall(0xff0000);
  redBall2.position.set(6,15,-32);
  scene.add(redBall2);

  var blackBall=createBall(0x000000);
  blackBall.position.set(0,15,-32)
  scene.add(blackBall);

  var yellowBall2=createBall(0xffff00);
  yellowBall2.position.set(-6,15,-32);
  scene.add(yellowBall2);

  var greenBall=createBall(0x228B22);
  greenBall.position.set(9,15,-38);
  scene.add(greenBall);

  var blueBall=createBall(0x0000ff);
  blueBall.position.set(3,15,-38);
  scene.add(blueBall);

  var darkorangeBall=createBall(0xFF4500);
  darkorangeBall.position.set(-3,15,-38);
  scene.add(darkorangeBall);

  var greenBall2=createBall(0x228B22);
  greenBall2.position.set(-9,15,-38);
  scene.add(greenBall2);

  var darkorangeBall2=createBall(0xFF4500);
  darkorangeBall2.position.set(12,15,-44);
  scene.add(darkorangeBall2);

  var blueBall2=createBall(0x0000ff);
  blueBall2.position.set(6,15,-44);
  scene.add(blueBall2);

  var orangeBall=createBall(0xFF8C00);
  orangeBall.position.set(0,15,-44);
  scene.add(orangeBall);

  var purpleBall2=createBall(0x4B0082);
  purpleBall2.position.set(-6,15,-44);
  scene.add(purpleBall2);

  var orangeBall2=createBall(0xFF8C00);
  orangeBall2.position.set(-12,15,-44);
  scene.add(orangeBall2);
}

function createTable(){
  console.log("Creating table!");


  var loader = new THREE.OBJLoader();
  var texture = new THREE.TextureLoader().load( '../images/blue.jpeg');
  var tableFloor = new Physijs.BoxMesh(
      new THREE.CubeGeometry( 105, 5, 150 ),
      new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5 }), 0
    );
  tableFloor.position.set(0,10,10);
  tableFloor.receiveShadow = true;
  scene.add( tableFloor );
  loader.load('../models/pool.obj', function (object) {
    object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
          scale = 3;
          object.position.set(60,0,100);
          object.scale.x=scale;
          object.scale.y=scale;
          object.scale.z=scale;
          scene.add( object );
        })



}
  /*
  loader.load("../models/pool.obj",
        function ( object ) {
          var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
          var pmaterial = new Physijs.createMaterial(material, 0,9, 0.5);
          table = new Physijs.BoxMesh( object, pmaterial);
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


/*function createGround(image){
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
*/
function createBall(color){
  var geometry = new THREE.SphereGeometry( 3, 20, 20);
  var material = new THREE.MeshLambertMaterial( { color: color} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.95);
  mass=10;
  var mesh = new Physijs.SphereMesh( geometry, pmaterial, mass);
  mesh.setDamping(0.1,0.1);
  mesh.castShadow = true;
  return mesh;
}

/*
function addBalls(){
  var numBalls = 2;

  for(i=0;i<numBalls;i++){
    var ball = createBall(0xffffff);
    ball.position.set(15,30+i*5,15);

    //ball.position.set(randN(20)+15,30,randN(20)+15);
    scene.add(ball);

    ball.addEventListener( 'collision',
      function( other_object, relative_velocity, relative_rotation, contact_normal ) {
      }
    )
  }
}
*/

function createAvatar(){
  var geometry = new THREE.SphereGeometry( 3, 20, 20);
  var material = new THREE.MeshLambertMaterial( { color: 0xff0000} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.95);
  var mesh = new Physijs.BoxMesh( geometry, pmaterial);
  mesh.setDamping(0.1,0.1);
  mesh.castShadow = true;



  avatarCam.position.set(0,4,0);
  avatarCam.lookAt(0,4,10);
  mesh.add(avatarCam);

  console.log("bal hit the cone");
  return mesh;

/*
  avatar.addEventListener( 'collision',
    function( other_object, relative_velocity, relative_rotation, contact_normal ) {
        if(other_object = ball1){
          console.log("bal hit the cone");
        }
        this.__dirtyPosition = true;
    }
  )
  */

}

function initScene(){
  scene = new Physijs.Scene();
  return scene;
}

function initPhysijs(){
  Physijs.scripts.worker = '../js/physijs_worker.js';
  Physijs.scripts.ammo = '../js/ammo.js';
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
  console.log("Keydown: '"+event.key+"'");
  console.dir(event);
  console.log(whiteBall_control.speed);
  switch (event.key){
    case "w": controls.fwd = true;  break;
		case "s": controls.bwd = true; break;
		case "a": controls.left = true; break;
		case "d": controls.right = true; break;
    case "m": controls.speed = 30; break;
    case "o": whiteBall_control.speed = (whiteBall_control.speed + 1) % 30; break;
		console.dir(avatar);
    //case "h": controls.reset = true; break;

    case "1": gameState.camera=camera; break;
    case "2": gameState.camera=skyCam; break;
    case "3": gameState.camera=avatarCam; break;

      console.log("camera changed");
  }

}

function keyup(event){
  switch (event.key){
    case "w": controls.fwd   = false;  break;
    case "s": controls.bwd   = false; break;
    case "a": controls.left  = false; break;
    case "d": controls.right = false; break;
    case "m": controls.speed = 10; break;
    //case "h": controls.reset = false; break;
    //case "o": whiteBall_control.speed = 0; break;
  }
}

function updateAvatar(){
  "change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)"

  var forward = avatar.getWorldDirection();

  if (controls.fwd){
    avatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
  } else if (controls.bwd){
    avatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
  } else {
    var velocity = avatar.getLinearVelocity();
    velocity.x=velocity.z=0;
    avatar.setLinearVelocity(velocity); //stop the xz motion
  }

  if (controls.left){
    avatar.setAngularVelocity(new THREE.Vector3(0,controls.speed*0.1,0));
  } else if (controls.right){
    avatar.setAngularVelocity(new THREE.Vector3(0,-controls.speed*0.1,0));
  }
/*
  if (controls.reset){
    avatar.__dirtyPosition = true;
    avatar.position.set(40,10,40);
  }
  */

}

function animate(){
  requestAnimationFrame( animate );

  switch(gameState.scene) {

    case "main":
      updateAvatar();
      skyCam.lookAt(avatar.position);
      scene.simulate();

      if (gameState.camera!= 'none'){
        renderer.render( scene, gameState.camera );
      }
    break;

    default:
      console.log("don't know the scene "+gameState.scene);
    }

    var info = document.getElementById("info");
		info.innerHTML='<div><progress value=' + whiteBall_control.speed + ' max=30>' +
				'</progress></div>';
}
