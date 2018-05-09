#pragma strict
var enemyStartingHealth : int = 150;                             // The amount of health the player starts the game with.
var currentEnemyHealth : int;   
var moveSpeed : float = 500;
var jumpSpeed : float = 25;
var fallSpeed : float = 64;
var maxFallSpeed : float = 60;
var maxUpSpeed : float = 25;
var fly : boolean; //for flying
private var parent : GameObject;
private var player : GameObject;
//for moving the enemy
private var h : float; //for horizontal
private var v : float; //for vertical 
private var jump : boolean; //for jumping
private var canMoveRight : boolean; //for moving horizontally right
private var canMoveLeft : boolean; //for moving horizontally left
private var onGround : boolean; //for ground check
private var polColl : PolygonCollider2D;
private var xScale : float; //xScale for player flip


private var vm : float; //vertical movement
private var hm : float; //horizontal movement
var scoreScript : Score;



function Awake () {
  polColl = GetComponent(PolygonCollider2D);
  currentEnemyHealth = enemyStartingHealth;
  parent = GameObject.Find("tank_monster");
  player = GameObject.Find("boris-MASS");
  scoreScript= GetComponent(Score);
}

function Update () {
    if (player == null)
    {
      player = GameObject.Find("boris-MASS");
    }
    if (parent == null)
    {
      parent = GameObject.Find("tank_monster");
      
       if (parent == null)
       {
         parent = GameObject.Find("tank_monster(Clone)");
       }
    }

    if (scoreScript == null)
    {
    scoreScript= GetComponent(Score);
    }
        
    h = Input.GetAxisRaw("Horizontal"); //get horizontal input
	v = Input.GetAxisRaw("Vertical"); //get vertical input
//	jump = Input.GetKey(KeyCode.W); //get jump input   
  
  
  
  
}


function FixedUpdate()
{
    //if no collision, go towards player
    if (canMoveRight == true)
    {
      h=0.001;
      
    }
    
    if (canMoveLeft == true)
    {
      h=-0.001;
      
    }
    
    var moveH : float = (h * moveSpeed * (Time.deltaTime*0.02))*-1;
    
		
		
	
	
	
	
	
	


	
	

	
	//Flip character orientation
	
	
//	if(h < 0){
//		transform.localScale.x = -xScale;
//
//	
//	} else if(h > 0){
//		transform.localScale.x = xScale;
//		
//	}
	
	
	
	
	
	rigidbody2D.AddForce(Vector2.right * moveH); //Apply horizontal movement

	

//	

	
	
}







public function takeDamage(amount : int)
{
   if (currentEnemyHealth <= 0)
   {
     Destroy(parent);
   }
   else
   {
   currentEnemyHealth -= amount;
   }
}

function OnCollisionEnter2D(c : Collision2D){
	CheckCollision(c);
}

function OnCollisionStay2D(c : Collision2D){
	CheckCollision(c);
}

function CheckCollision(hit : Collision2D){
	    
	 	
  
		
		if (hit.gameObject.name.Equals("bullet(Clone)"))
		{
		   takeDamage(3); 
//		   scoreScript.scoringTankMonster();
		}
		
		//for allowing to jump if not stuck into the player but stuck into something
		if (hit.gameObject.name.Equals("boris-MASS"))
		{
		  jump = true;
		}
		
		if (hit.gameObject.Equals(null) && player.transform.localPosition.x - this.transform.position.x >4) 
		{
		  canMoveLeft=true;
		  
		}

		if (hit.gameObject.Equals(null) && player.transform.localPosition.x - this.transform.position.x <-4) 
		{
		  canMoveRight=true;
		}				
	
        
                                                                                                

  

}