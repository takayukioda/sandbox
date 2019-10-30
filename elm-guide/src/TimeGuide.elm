module Main exposing (Model, init, main)

import Browser
import Html exposing (..)
import Task
import Time



-- Main


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- Model


type alias Model =
    { zone : Time.Zone
    , time : Time.Posix
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model Time.utc (Time.millisToPosix 0) False
    , Task.perform AdjustTimeZone Time.here
    )



-- Update


type Msg
    = Tick Time.Posix
    | AdjustTimeZone Time.Zone
    | StopTimer


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Tick newTime ->
            ( { model | time = newTime }
            , Cmd.none
            )

        AdjustTimeZone newZone ->
            ( { model | zone = newZone }
            , Cmd.none
            )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Time.every 1000 Tick


view model =
    let
        hour =
            String.fromInt (Time.toHour model.zone model.time)

        minute =
            String.fromInt (Time.toMinute model.zone model.time)

        second =
            String.fromInt (Time.toSecond model.zone model.time)
    in
    div []
        [ h1 [] [ text (hour ++ ":" ++ minute ++ ":" ++ second) ]
        , button [ onClick StopTimer ] [ text "stop" ]
        ]
