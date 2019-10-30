object CaseObject {
  import Enum._
  import EnumApply._
  def main(args: Array[String]) {
    val enum = One
    println(enum.toString)
    println(enum.toInt)

    val enumApply = Dos
    println(enumApply.toString)
    println(enumApply.toInt)

    val enumUno = EnumApply(1)
    println(enumUno.toString)
    println(enumUno.toInt)

    /**
     * // This will be an compile error
     * val enumTwo = Enum(2)
     * println(enumTwo.toString)
     * println(enumTwo.toInt)
     */
  }
  sealed abstract class Enum (val value: Int) {
    def toInt: Int = value
  }
  object Enum {
    case object One extends Enum (1)
    case object Two extends Enum (2)
  }

  sealed abstract class EnumApply (val value: Int) {
    def toInt: Int = value
  }
  object EnumApply {
    def apply(v: Int): EnumApply = v match {
      case 1 => Uno
      case 2 => Dos
    }
    case object Uno extends EnumApply(1)
    case object Dos extends EnumApply(2)
  }
}
