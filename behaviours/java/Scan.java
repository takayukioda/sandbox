import java.util.Scanner;

public class Scan
{
	public static void main (String[] args)
	{
		Scanner in = new Scanner(System.in);
		System.out.print("Size > ");
		int size = in.nextInt();
		System.out.print("Mines > ");
		int mines = in.nextInt();

		System.out.printf("Size: %d\nMines: %d\n", size, mines);
	}
}
