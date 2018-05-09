import UnityEngine.UI;

var startingHealth : int = 100;                             // The amount of health the player starts the game with.
var currentHealth : int;                                    // The current health the player has.
private var heart1 : GameObject;  
private var heart2 : GameObject;
private var heart3 : GameObject;                                // Reference to the UI's health bar.                                    // Reference to an image to flash on the screen on being hurt.
   
private var player : GameObject;                                             // The audio clip to play when the player dies.
public var menu : GUIStyle;
public var restartButton: GUIStyle;
public var help: GUIStyle;
public var instructions: GUIStyle;

private var restartButtonEnabled : boolean = false;
private var helpButtonEnabled : boolean = false;
private var anim : Animator;                                              // Reference to the Animator component.
 // Reference to the PlayerShooting script.
 var isDead : boolean;                                                // Whether the player is dead.
 var damaged : boolean;                                               // True when the player gets damaged.


function Start ()
{
    
    heart1 = GameObject.Find("heart1");
    heart2 = GameObject.Find("heart2");
    heart3 = GameObject.Find("heart3");
    player = GameObject.Find("boris-MASS");
    // Setting up the references.
    anim = GetComponent (Animator);
    // Set the initial health of the player.
    currentHealth = startingHealth;

     
    
}


function Update ()
{
    if (heart1==null || heart2==null || heart3==null)
    {
      heart1 = GameObject.Find("heart1");
      heart2 = GameObject.Find("heart2");
      heart3 = GameObject.Find("heart3");
    }
    if (damaged) 
    { 
      TakeDamage(1);
    }
    damaged = false;
    
}


public function TakeDamage (amount : int)
{

    // Set the damaged flag so the screen will flash.
    damaged = true;

    // Reduce the current health by the damage amount.
    currentHealth -= amount;
    

    // Set the health bar's value to the current health.
    if (currentHealth >= 65)
    {
    heart1.transform.localPosition.z = 4;
    heart2.transform.localPosition.z = 4;
    heart3.transform.localPosition.z = 4;
    }
    if (currentHealth >= 30 && currentHealth <65)
    {
    heart1.transform.localPosition.z = 4;
    heart2.transform.localPosition.z = 4;
    heart3.transform.localPosition.z = 70;   
    }
    if (currentHealth >0 && currentHealth <30)
    {
    heart1.transform.localPosition.z = 4;
    heart2.transform.localPosition.z = 70;
    heart3.transform.localPosition.z = 70;
    }
    

    // Play the hurt sound effect.
    

    // If the player has lost all it's health and the death flag hasn't been set yet...
    if(currentHealth <= 0 && !isDead)
    {
    heart1.transform.localPosition.z = 70;
    heart2.transform.localPosition.z = 70;
    heart3.transform.localPosition.z = 70;        
        // ... it should die.
        Death ();
    }
    
}


function Death ()
{
    // Set the death flag so this function won't be called again.
   
    isDead = true;

    // Tell the animator that the player is dead.
   // anim.SetTrigger ("Die");

   
   
    restartButtonEnabled = true;
 

    SingletonAudio.instance.PlayDie();
    
    
  
}

function OnGUI()
{ 
     
   
    //making restart button
    //showing it only if player died
    if (helpButtonEnabled)
    {
        restartButtonEnabled = false;
        GUI.Box (Rect (Screen.width*0.7/3.55,Screen.height*0.1,Screen.width*0.6,Screen.height*0.9), "", instructions);
        if (GUI.Button(Rect(Screen.width*0.7/2,Screen.height*0.9,Screen.width*0.3,Screen.height*0.1),"OK", help))
        {
        helpButtonEnabled = false;
        restartButtonEnabled = true;
        
        
        
        }
    }
    
    if (restartButtonEnabled)
    {

    
    
    GUI.Box (Rect (Screen.width*0.7/3.55,Screen.height*0.1,Screen.width*0.6,Screen.height*0.9), "You Died!", menu);
     
    
    if (GUI.Button(Rect(Screen.width*0.7/2,Screen.height*0.8/2,Screen.width*0.3,Screen.height*0.1),"Restart", restartButton))
      {
       

       currentHealth = startingHealth;
       isDead = false;
       restartButtonEnabled = false;
           
       Application.LoadLevel("scene 1");
        
        

      }
      
      if (GUI.Button(Rect(Screen.width*0.7/2,Screen.height*0.55,Screen.width*0.3,Screen.height*0.1),"How to play", restartButton))
      {
        helpButtonEnabled = true;
      

      
      
        } 
       
      if (GUI.Button(Rect(Screen.width*0.7/2,Screen.height*0.7,Screen.width*0.3,Screen.height*0.1),"QuitGame", restartButton))
      {
      restartButtonEnabled = false;
      Application.Quit();
      
      
      } 
    
}
}