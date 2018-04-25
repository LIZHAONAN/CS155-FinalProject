var scene, renderer;
var camera, skyCam, avatarCam;
var table;
var avatar;
var endScene, endCamera, endText;
var whiteBall_control = {speed:0};

var controls =
  {fwd:false, bwd:false, left:false, right:false,
   speed:10}
var gameState =
     {scene:'main', camera:'none',score:0,yb:0,rb:0,pb:0,rb2:0,bb:0,yb2:0,gb:0,blub:0,dob:0,gb2:0,dob2:0,blub2:0,ob:0,pb2:0,ob2:0}
var yellowBall,redBall,purpleBall,redBall2,blackBall,yellowBall2,greenBall,blueBall,darkorangeBall,greenBall2,darkorangeBall2,blueBall2,orangeBall,purpleBall2,orangeBall2;

init();
initControls();
animate();
function createEndScene(){


  endScene = initScene();
  endText = createSkyBox('youwon.png',10);
  //endText.rotateX(Math.PI);
  endScene.add(endText);
  var light1 = createPointLight();
  light1.position.set(0,200,20);
  endScene.add(light1);
  endCamera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
  endCamera.position.set(0,50,1);
  endCamera.lookAt(0,0,0);

}

function init(){
  initPhysijs();
  scene = initScene();
  createEndScene();
  initRenderer();
  createMainScene();
  //createGameScene();
  //createTable();
}
function createMainScene(){
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

	yellowBall=createBall(0xffff00);
  yellowBall.position.set(0,15,-20);
  scene.add(yellowBall);  console.dir(yellowBall)

  redBall=createBall(0xff0000);
  redBall.position.set(3,15,-26);
  scene.add(redBall);

  purpleBall=createBall(0x4B0082);
  purpleBall.position.set(-3,15,-26);
  scene.add(purpleBall);

  redBall2=createBall(0xff0000);
  redBall2.position.set(6,15,-32);
  scene.add(redBall2);

  blackBall=createBall(0x000000);
  blackBall.position.set(0,15,-32)
  scene.add(blackBall);

  yellowBall2=createBall(0xffff00);
  yellowBall2.position.set(-6,15,-32);
  scene.add(yellowBall2);

  greenBall=createBall(0x228B22);
  greenBall.position.set(9,15,-38);
  scene.add(greenBall);

  blueBall=createBall(0x0000ff);
  blueBall.position.set(3,15,-38);
  scene.add(blueBall);

  darkorangeBall=createBall(0xFF4500);
  darkorangeBall.position.set(-3,15,-38);
  scene.add(darkorangeBall);

  greenBall2=createBall(0x228B22);
  greenBall2.position.set(-9,15,-38);
  scene.add(greenBall2);

  darkorangeBall2=createBall(0xFF4500);
  darkorangeBall2.position.set(12,15,-44);
  scene.add(darkorangeBall2);

  blueBall2=createBall(0x0000ff);
  blueBall2.position.set(6,15,-44);
  scene.add(blueBall2);

  orangeBall=createBall(0xFF8C00);
  orangeBall.position.set(0,15,-44);
  scene.add(orangeBall);

  purpleBall2=createBall(0x4B0082);
  purpleBall2.position.set(-6,15,-44);
  scene.add(purpleBall2);

  orangeBall2=createBall(0xFF8C00);
  orangeBall2.position.set(-12,15,-44);
  scene.add(orangeBall2);

  var bar1=createBoxMesh(95,4,14);
  bar1.position.set(0,16,-107);
  scene.add(bar1);

  var bar2=createBoxMesh(95,4,14);
  bar2.position.set(0,16,115);
  scene.add(bar2);

  var bar3=createBoxMesh(90,4,14);
  bar3.rotateY(Math.PI/2)
  bar3.position.set(-60,16,-50);
  scene.add(bar3);

  var bar4=createBoxMesh(90,4,14);
  bar4.rotateY(Math.PI/2)
  bar4.position.set(60,16,-50);
  scene.add(bar4);

  var bar5=createBoxMesh(90,4,14);
  bar5.rotateY(Math.PI/2)
  bar5.position.set(-60,16,56);
  scene.add(bar5);

  var bar6=createBoxMesh(90,4,14);
  bar6.rotateY(Math.PI/2)
  bar6.position.set(60,16,56);
  scene.add(bar6);

  avatar.setLinearVelocity(new THREE.Vector3(1,0,0));
}

function createTable(){
  console.log("Creating table!");


  var loader = new THREE.OBJLoader();
  var texture = new THREE.TextureLoader().load( '../images/table.jpg');

  var scale = 2.3;
  var tableFloor = new Physijs.BoxMesh(
      new THREE.CubeGeometry( scale * 54, 5, scale * 102 ),
      new THREE.MeshBasicMaterial({ wireframe: true, opacity: 0.5 }), 0
    );
  tableFloor.position.set(0,10,10);
  tableFloor.receiveShadow = true;
  scene.add( tableFloor );

  loader.load('../models/PoolTable.obj', function (object) {
    object.traverse( function ( child ) {
						if ( child instanceof THREE.Mesh ) {
							child.material.map = texture;
						}
					} );
          var scale = 100;
          object.position.set(16,-76.3,28);
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
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff} );
  var pmaterial = new Physijs.createMaterial(material,0.9,0.95);
  var mesh = new Physijs.BoxMesh( geometry, pmaterial);
  mesh.setDamping(0.1,0.1);
  mesh.castShadow = true;



  avatarCam.position.set(0,4,0);
  avatarCam.lookAt(0,4,10);
  mesh.add(avatarCam);

  return mesh;

}

function initScene(){
  var scene = new Physijs.Scene();
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

function createBoxMesh(w,h,d){
  var geometry = new THREE.BoxGeometry( w, h, d);
  var material = new THREE.MeshLambertMaterial( { color: 0x8B4513} );
  mesh = new Physijs.BoxMesh( geometry, material,0 );
  return mesh;
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
		case "a": controls.left = true; console.log(avatarCam.getWorldDirection());break;
		case "d": controls.right = true; break;
    case "m": controls.speed = 30; break;
    case "o": //whiteBall_control.speed=20;
              whiteBall_control.speed = (whiteBall_control.speed + 1) % 30;
              break;
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
    case "o":
      var dir = avatarCam.getWorldDirection();
      var x = dir.x;
      var y = dir.y;
      var z = dir.z;
      var s = 2 * whiteBall_control.speed;
      //avatar.__dirtyPosition = true;
      //avatar.__dirtyRotation = true;
      console.log(dir);
      avatar.setLinearVelocity(new THREE.Vector3(x * s, y * s, z * s));
    break;
  }
}

function updateBall(){
  if(gameState.yb==0){
      if(yellowBall.position.x>=55||yellowBall.position.x<=-56||yellowBall.position.z>=106||yellowBall.position.z<=-98){
        gameState.score+=1;
        yellowBall.position.y = yellowBall.position.y - 100;
        yellowBall.__dirtyPosition = true;
        gameState.yb=1;
      }
  }
  if(gameState.rb==0){
      if(redBall.position.x>=55||redBall.position.x<=-56||redBall.position.z>=106||redBall.position.z<=-98){
        gameState.score+=1;
        redBall.position.y = redBall.position.y - 100;
        redBall.__dirtyPosition = true;
        gameState.rb=1;
      }
  }
  if(gameState.pb==0){
      if(purpleBall.position.x>=55||purpleBall.position.x<=-56||purpleBall.position.z>=106||purpleBall.position.z<=-98){
        gameState.score+=1;
        purpleBall.position.y = purpleBall.position.y - 100;
        purpleBall.__dirtyPosition = true;
        gameState.pb=1;
      }
  }
  if(gameState.rb2==0){
      if(redBall2.position.x>=55||redBall2.position.x<=-56||redBall2.position.z>=106||redBall2.position.z<=-98){
        gameState.score+=1;
        redBall2.position.y = redBall2.position.y - 100;
        redBall2.__dirtyPosition = true;
        gameState.rb2=1;
      }
  }
  if(gameState.bb==0){
      if(blackBall.position.x>=55||blackBall.position.x<=-56||blackBall.position.z>=106||blackBall.position.z<=-98){
        gameState.score+=1;
        blackBall.position.y = blackBall.position.y - 100;
        blackBall.__dirtyPosition = true;
        gameState.bb=1;
      }
  }
  if(gameState.yb2==0){
      if(yellowBall2.position.x>=55||yellowBall2.position.x<=-56||yellowBall2.position.z>=106||yellowBall2.position.z<=-98){
        gameState.score+=1;
        yellowBall2.position.y = yellowBall2.position.y - 100;
        yellowBall2.__dirtyPosition = true;
        gameState.yb2=1;
      }
  }
  if(gameState.gb==0){
      if(greenBall.position.x>=55||greenBall.position.x<=-56||greenBall.position.z>=106||greenBall.position.z<=-98){
        gameState.score+=1;
        greenBall.position.y = greenBall.position.y - 100;
        greenBall.__dirtyPosition = true;
        gameState.gb=1;
      }
  }
  if(gameState.blub==0){
      if(blueBall.position.x>=55||blueBall.position.x<=-56||blueBall.position.z>=106||blueBall.position.z<=-98){
        gameState.score+=1;
        blueBall.position.y = blueBall.position.y - 100;
        blueBall.__dirtyPosition = true;
        gameState.blub=1;
      }
  }
  if(gameState.dob==0){
      if(darkorangeBall.position.x>=55||darkorangeBall.position.x<=-56||darkorangeBall.position.z>=106||darkorangeBall.position.z<=-98){
        gameState.score+=1;
        darkorangeBall.position.y = darkorangeBall.position.y - 100;
        darkorangeBall.__dirtyPosition = true;
        gameState.dob=1;
      }
  }
  if(gameState.gb2==0){
      if(greenBall2.position.x>=55||greenBall2.position.x<=-56||greenBall2.position.z>=106||greenBall2.position.z<=-98){
        gameState.score+=1;
        greenBall2.position.y = greenBall2.position.y - 100;
        greenBall2.__dirtyPosition = true;
        gameState.gb2=1;
      }
  }
  if(gameState.dob2==0){
      if(darkorangeBall2.position.x>=55||darkorangeBall2.position.x<=-56||darkorangeBall2.position.z>=106||darkorangeBall2.position.z<=-98){
        gameState.score+=1;
        darkorangeBall2.position.y = darkorangeBall2.position.y - 100;
        darkorangeBall2.__dirtyPosition = true;
        gameState.dob2=1;
      }
  }
  if(gameState.blub2==0){
      if(blueBall2.position.x>=55||blueBall2.position.x<=-56||blueBall2.position.z>=106||blueBall2.position.z<=-98){
        gameState.score+=1;
        blueBall2.position.y = blueBall2.position.y - 100;
        blueBall2.__dirtyPosition = true;
        gameState.blub2=1;
      }
  }
  if(gameState.ob==0){
      if(orangeBall.position.x>=55||orangeBall.position.x<=-56||orangeBall.position.z>=106||orangeBall.position.z<=-98){
        gameState.score+=1;
        orangeBall.position.y = orangeBall.position.y - 100;
        orangeBall.__dirtyPosition = true;
        gameState.ob=1;
      }
  }
  if(gameState.pb2==0){
      if(purpleBall2.position.x>=55||purpleBall2.position.x<=-56||purpleBall2.position.z>=106||purpleBall2.position.z<=-98){
        gameState.score+=1;
        purpleBall2.position.y = purpleBall2.position.y - 100;
        purpleBall2.__dirtyPosition = true;
        gameState.pb2=1;
      }
  }
  if(gameState.ob2==0){
      if(orangeBall2.position.x>=55||orangeBall2.position.x<=-56||orangeBall2.position.z>=106||orangeBall2.position.z<=-98){
        gameState.score+=1;
        orangeBall2.position.y = orangeBall2.position.y - 100;
        orangeBall2.__dirtyPosition = true;
        gameState.ob2=1;
      }
  }
  if (gameState.score==15) {

          gameState.scene='youwon';
      }
}

function updateAvatar(){
  "change the avatar's linear or angular velocity based on controls state (set by WSAD key presses)"

  var forward = avatar.getWorldDirection();
/*
  if (controls.fwd){
    avatar.setLinearVelocity(forward.multiplyScalar(controls.speed));
  } else if (controls.bwd){
    avatar.setLinearVelocity(forward.multiplyScalar(-controls.speed));
  } else {
    var velocity = avatar.getLinearVelocity();
    //velocity.x=velocity.z=0;
    avatar.setLinearVelocity(velocity); //stop the xz motion
  }
*/
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
    case "youwon":

      endText.rotateY(0.005);
      renderer.render( endScene, endCamera );
      break;

    case "main":
      updateAvatar();
      updateBall();
      skyCam.lookAt(0,10,25);
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
				'</progress></div>'+'<div style="font-size:24pt">Score: ' + gameState.score + '</div>';
}


function createSkyBox(image,k){
  // creating a textured plane which receives shadows
  var geometry = new THREE.SphereGeometry( 80, 80, 80 );
  var texture = new THREE.TextureLoader().load( '../images/'+image );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( k, k );
  var material = new THREE.MeshLambertMaterial( { color: 0xffffff,  map: texture ,side:THREE.DoubleSide} );
  //var pmaterial = new Physijs.createMaterial(material,0.9,0.5);
  //var mesh = new THREE.Mesh( geometry, material );
  var mesh = new THREE.Mesh( geometry, material);

  mesh.receiveShadow = false;


  return mesh
  // we need to rotate the mesh 90 degrees to make it horizontal not vertical


}
