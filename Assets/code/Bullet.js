// The speed that bullet moves with
var Speed : float = .4; 

// The number of seconds before the bullet is automatically destroyed 
var SecondsUntilDestroy : float = 10; 

private var startTime : float;
private var Body : GameObject;
private var xScale : float;

function Start () {
    startTime = Time.time; 
    Body = GameObject.Find("boris-MASS"); 
    //get correct orientation
    xScale = Body.transform.localScale.x;
} 

function FixedUpdate () {
    //setting where bullet will shoot, left or right
    if (xScale > 0)
    {
    this.gameObject.transform.position += Speed * this.gameObject.transform.right;
    }
    if (xScale < 0)
    {
      this.gameObject.transform.position += -Speed * this.gameObject.transform.right;
    }
    
       //destroy the object after SecondsUntilDest passed
    if (Time.time - startTime >= SecondsUntilDestroy) {
        Destroy(this.gameObject);
    } 
}
     
function OnCollisionEnter(collision : Collision) {
    
       // Remove the Bullet from the world 
    Destroy(this.gameObject); 
}


                                                                                                

  

