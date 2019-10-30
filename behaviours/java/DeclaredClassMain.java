public class DeclaredClassMain
{
	public static void main (String ... args)
	{
		DeclaredClass dklass = new DeclaredClass();
		dklass.doit();

		Class klass = DeclaredClassMain.class;
		System.out.println(klass);

		System.out.println("Name          : " + klass.getName());
		System.out.println("Simple Name   : " + klass.getSimpleName());
		System.out.println("Canonical Name: " + klass.getCanonicalName());

		System.out.println("getClasses:");
		for (Class c : klass.getClasses()) {
			System.out.println(c);
		}

		System.out.println("getDeclaredClasses:");
		for (Class c : klass.getDeclaredClasses()) {
			System.out.println(c);
		}
	}

	class InnerDeclaredClassMain
	{
		public void doti ()
		{
			System.out.println("Dot It!!");
		}
	}
}

class OuterDeclaredClassMain
{
	public void doti ()
	{
		System.out.println("Dot It!!");
	}
}
