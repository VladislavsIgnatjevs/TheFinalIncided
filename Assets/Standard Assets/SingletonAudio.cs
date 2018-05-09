using UnityEngine;
using System.Collections;


//use SingletonAudio.instance.PlayJump();

public class SingletonAudio : MonoBehaviour
{
	private static SingletonAudio _instance;
	public AudioSource [] sounds;
	public AudioSource shootPistol;
	public AudioSource shootRifle;
	public AudioSource die;
	public AudioSource jump;
	public AudioSource getHit;
	public AudioSource pickupHeart;
	public bool muted = false;


public static SingletonAudio instance 
{
	get
	{
		if (_instance == null)
		{
			_instance = GameObject.FindObjectOfType<SingletonAudio>();
			//dont destroy when loading new scene
			DontDestroyOnLoad(_instance.gameObject);
		}
		return _instance;
	}
}

void Awake()
{
	if(_instance == null)
	{
		//make the first instance a singleton
		_instance = this;
	    DontDestroyOnLoad(this);
	}

	else 
	{
		//if singleton already exists find reference and destroy
		if (this != _instance)
			Destroy(this.gameObject);
	}
}
    public void Start() {
	sounds = GetComponents<AudioSource>();
	shootPistol = sounds[0];
	shootRifle= sounds[1];
	die = sounds[2];
	jump = sounds[3];
	getHit = sounds[4];
	pickupHeart = sounds[5];
    }

public void changeMute() {
	if (!muted)
		muted = true;
	else
		muted = false;
}

public void PlayJump()
{
	if (!muted)
		jump.Play();
}

public void PlayShootPistol()
  {
	if (!muted)
		shootPistol.Play();
  }

public void PlayShootRifle()
{
	if (!muted)
		shootRifle.Play();
}

public void PlayDie()
{
	if (!muted)
	
		die.Play();

}

public void PlayGetHit()
{
	if (!muted)
		getHit.Play();
}

public void PlayPickupHeart()
{
	if (!muted)
		pickupHeart.Play();
}
}