module Main exposing (ageDecoder, nameDecoder)

import Json.Decode exposing (Decoder, field, int, map2, string)


ageDecoder : Decoder Int
ageDecoder =
    field "age" int



-- int : Decoder Int
-- field : String -> Decoder a -> Decoder a


nameDecoder : Decoder String
nameDecoder =
    field "name" string


gifDecoder : Decoder String
gifDecoder =
    field "data" (field "image_url" string)



-- map2 : (a -> b -> value) -> Decoder a -> Decoder b -> Decoder value


type alias Person =
    { name : String
    , age : Int
    }


personDecoder : Decoder Person
personDecoder =
    map2 Person
        (field "name" string)
        (field "age" int)


combinedPersonDecoder : Decoder Person
combinedPersonDecoder =
    map2 Person nameDecoder ageDecoder
