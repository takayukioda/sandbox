public class ClassProperties
{
	public String name;
	public int age;
	protected char gender;
	private boolean is_alive;

	public ClassProperties ()
	{
		this.name = "John Doe";
		this.age = 20;
		this.gender = 'M';
		this.is_alive = false;
	}

	public ClassProperties (String name, int age)
	{
		this.name = name;
		this.age = age;
		this.gender = 'U';
		this.is_alive = true;
	}

	public ClassProperties (String name, int age, char gender)
	{
		this.name = name;
		this.age = age;
		this.gender = decideGender(gender);
		this.is_alive = true;
	}

	private char decideGender (char g)
	{
		switch (g) {
			case 'M': // Male
				return 'M';
			case 'F': // Female
				return 'F';
			default: // Unknown
				return 'U';
		}
	}

	public boolean isAlive ()
	{
		return is_alive;
	}

	public String getName ()
	{
		return name;
	}

	public void sayHello ()
	{
		System.out.println("Hello! I am "+ name);
	}

}
