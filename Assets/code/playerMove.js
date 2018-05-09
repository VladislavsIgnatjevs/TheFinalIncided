#pragma strict
var moveSpeed : float = 8;
var jumpSpeed : float = 25;
var fallSpeed : float = 64;
var maxFallSpeed : float = 60;
var maxUpSpeed : float = 25;
var slopeLimit : float = 45;
var dashSpeed : float = 120;
var fly : boolean; //for flying
var bullet : GameObject; //for manipulating bullet
var pistol: Transform; // for getting pistol position


//afk
var SecondsUntilAFK : float = 5;
//private var startTime : float;

private var vm : float; //vertical movement
private var hm : float; //horizontal movement
private var shooting : boolean; // is shooting check
private var weaponSelected : int; //for weapons
var onGround : boolean; //for ground check
var canShoot : boolean; //for shooting
private var xScale : float; //xScale for player flip
private var xBullet : float; //xScale for bullet flip
private var h : float; //for horizontal
private var v : float; //for vertical 
private var jump : boolean; //for jumping
private var dodge : boolean; // for dodging
private var anim : Animator; //animator
private var boxColl : BoxCollider2D; //box collider
private var adjustBulletPosition  : Vector3; //position var for bullet
private var adjustBulletPositionNegatve  : Vector3; //position var for bullet
private var getPosition : Vector3; //position var for bullet
private var rifleIco : GameObject; //rifle ico
private var pistolIco : GameObject; //pistol ico
private var playerHealth: PlayerHealth;


function Start () {
    canShoot = false;
    adjustBulletPosition =Vector3(15f,2,0);
    adjustBulletPositionNegatve =Vector3(-15f,2,0); 
	xScale = transform.localScale.x; //Get correct starting Orientation for player.
	anim = gameObject.GetComponent("Animator"); //Get Animations for character
	boxColl = GetComponent(BoxCollider2D);
	
	rifleIco = GameObject.Find("AK47Ico");
    pistolIco = GameObject.Find("pistolIco");
    
//    startTime = Time.time;

    

}

function Update () {
    if (rifleIco==null || pistolIco==null) 
    {
	  rifleIco = GameObject.Find("AK47Ico");
      pistolIco = GameObject.Find("pistolIco");    
    }
    
    playerHealth = GetComponent(PlayerHealth); 
	h = Input.GetAxisRaw("Horizontal"); //get horizontal input
	v = Input.GetAxisRaw("Vertical"); //get vertical input
	jump = Input.GetKey(KeyCode.W); //get jump input  
	dodge=Input.GetKey(KeyCode.S); //get dodge input
	shooting = Input.GetKey(KeyCode.Space); //get shooting input
	xBullet = transform.localScale.x; 

}

function FixedUpdate(){



//inplementing weapon selection by pressing 1,2,3,4  
    //hiding all weapons  
    if (Input.GetKeyDown(KeyCode.Alpha1))
       {
         weaponSelected = 0;
         anim.SetInteger("WeaponSelected", weaponSelected); //transfer variable to animator
         canShoot = false;
         rifleIco.transform.localPosition.z = 70;  //hide ico
         pistolIco.transform.localPosition.z = 70;  //hide ico
        
       }  
    //selecting pistol   
    if (Input.GetKeyDown(KeyCode.Alpha2))
       {
         weaponSelected = 1;
         anim.SetInteger("WeaponSelected", weaponSelected); //transfer variable to animator
         canShoot = true;
         
         rifleIco.transform.localPosition.z = 70; //hide ico
         pistolIco.transform.localPosition.z = 4; //show ico

       } 
    //selecting rifle    
    if (Input.GetKeyDown(KeyCode.Alpha3))
       {
         weaponSelected = 2;
         anim.SetInteger("WeaponSelected", weaponSelected); //transfer variable to animator
         canShoot = true;
         rifleIco.transform.localPosition.z = 4; //show ico
         pistolIco.transform.localPosition.z = 70;  //hide ico

       }  
    //selecting grenade                 
    if (Input.GetKeyDown(KeyCode.Alpha4))
       {
         weaponSelected = 3;
         anim.SetInteger("WeaponSelected", weaponSelected); //transfer variable to animator
         canShoot = false;
       }         
    
//shooting

     if (shooting)
     {
       anim.SetBool("Shooting", shooting); //transfer shooting to animator
       //calibrate for orientation
       
       if (xBullet >0 && onGround)
       {
       getPosition = transform.position + adjustBulletPosition;
       }
       if (xBullet<0 && onGround )
       {
       
       getPosition = transform.position + adjustBulletPositionNegatve;
       }
       if (canShoot)
       {
       var newBullet : GameObject = Instantiate(bullet, getPosition, transform.rotation);
       SingletonAudio.instance.PlayShootPistol();
       }
     }
     else { 
     anim.SetBool("Shooting", false);
     
     }
     



//jumping    
	if (onGround && jump){ //check if player is grounded and can jump
		vm = jumpSpeed;
		SingletonAudio.instance.PlayJump();
		
	}
	
	var moveH : float = h * moveSpeed * Time.deltaTime; //Smoothen horizontal movement

	
	//14:19
    
    hm=moveH; //assigning horizontal movement value to hm
//    if (hm >= 5 || hm <= -5)
//    {
//       SingletonAudio.instance.PlayWalk();
//    }
    anim.SetFloat("HM", hm); //send HM parameter to animator
	
	
	//setting afk
//    if (Time.time - startTime >= SecondsUntilAFK && hm=0) {
//        anim.SetBool("afk",true);
//    } 
	
	//Flip character orientation
	if(h < 0){
		transform.localScale.x = -xScale;

	
	} else if(h > 0){
		transform.localScale.x = xScale;
		
	}
	
	anim.SetFloat("VM", vm); //send VM parameter to animator
	
	
	anim.SetBool("Grounded", onGround); //send Grounded parameter to animator
	rigidbody2D.AddForce(Vector2.right * moveH); //Apply horizontal movement
	rigidbody2D.AddForce(Vector2.up * vm); //Apply vertical movement
	
	if(fly){ //fly
		if(v > 0){
			//apply flying
			vm += v * Time.deltaTime * 20;
		} else {
			//apply gravity
			vm -= fallSpeed * Time.deltaTime;
		}
	} else {
		//apply gravity
		vm -= fallSpeed * Time.deltaTime;
	}
	
	
	vm = Mathf.Clamp(vm, -maxFallSpeed, maxUpSpeed); //Clamp vertical speeds
//clear-outs	
	rigidbody2D.velocity = Vector2.zero; //Stop movement if there is no input
	onGround = false; //Clear out grounding check
	
	
}

function OnCollisionEnter2D(c : Collision2D){
	CheckCollision(c);
}

function OnCollisionStay2D(c : Collision2D){
	CheckCollision(c);
}

function CheckCollision(c : Collision2D){
	for(var contact in c.contacts){
		//Check if floor is hit
		if(vm <= 0 && contact.point.y >= transform.position.y - (boxColl.size.y/2) && Vector2.Angle(Vector2.up, contact.normal) <= slopeLimit){
			onGround = true;
			vm = Mathf.Max(0, vm);
		}
		//if colliding with bulbman
		if (c.gameObject.name.Equals("bulbman"))
		{
		   playerHealth.TakeDamage(1); 
		}
		
		//if colliding with tank_monster
		if (c.gameObject.name.Equals("tank_monster"))
		{
		   playerHealth.TakeDamage(2); 
		}
		
		//or their clones
		
		if (c.gameObject.name.Equals("bulbman(Clone)"))
		{
		   playerHealth.TakeDamage(1); 
		}
		
		//if colliding with tank_monster
		if (c.gameObject.name.Equals("tank_monster(Clone)"))
		{
		   playerHealth.TakeDamage(2); 
		}
	}

                                                                                                

  

}