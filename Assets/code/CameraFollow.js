#pragma strict
var player : GameObject; //target we want camera to follow
var distance : float = 10.0;
var height: float = 5.5; //points to move vertically
var width: float = 3.0; //points to move horizontally
var damping : float = 10.0; //smoothing for camera to reach target in certain time
var respawnPosition : Vector3; //position we set player to initially, once the game is reset

//awake is called only once on the start
function Awake () {
  player = GameObject.Find("boris-MASS"); //find object of player we use
  player.transform.position = respawnPosition; //put player in the initial position
  DontDestroyOnLoad(player); //prevent unity from destroying player object when reset is hit

}

function Update () {


       //defining the wanted position for camera
       var wantedPosition : Vector3 = player.transform.TransformPoint(width,height, -distance);
       //moving camera to the position we want with applied smoothing 
       transform.position = Vector3.Lerp(transform.position, wantedPosition, Time.deltaTime * damping);


  }