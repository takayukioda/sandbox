// アドホック多相 by Implicit Parameter
object ImplicitParameter {
  trait Flipper[T] {
    def doFlip (x: T): T
  }
  implicit object IntFlipper extends Flipper[Int] {
    def doFlip(x: Int) = - x
  }
  implicit object StringFlipper extends Flipper[String] {
    def doFlip(x: String) = x.reverse
  }
  implicit object BooleanFlipper extends Flipper[Boolean] {
    def doFlip(x: Boolean) = ! x
  }
  def flip[T](x: T)(implicit flipper: Flipper[T]) = flipper.doFlip(x)
  def main (args: Array[String]) {
    println(flip(1))
    println(flip("String"))
    println(flip(true))
  }
}
