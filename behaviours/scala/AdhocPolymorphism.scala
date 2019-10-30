// アドホック多相 by Object Oriented Programming
object AdhocPolymorphism {
  def main (args: Array[String]) {
    println(flip(1, IntFlipper))
    println(flip("String", StringFlipper))
    println(flip(true, BooleanFlipper))
  }
  trait Flipper[T] {
    def doFlip (x: T): T
  }
  object IntFlipper extends Flipper[Int] {
    def doFlip(x: Int) = - x
  }
  object StringFlipper extends Flipper[String] {
    def doFlip(x: String) = x.reverse
  }
  object BooleanFlipper extends Flipper[Boolean] {
    def doFlip(x: Boolean) = ! x
  }
  def flip[T](x: T, flipper: Flipper[T]) = flipper.doFlip(x)
}
