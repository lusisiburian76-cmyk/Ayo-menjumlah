/* =========================================
   AYO MENJUMLAH
========================================= */


/* =========================================
   DAFTAR BENDA
========================================= */

const objects = [
    "🍎",
    "🍌",
    "🚗",
    "⚽",
    "🧸",
    "✏️",
    "🚁",
    "✈️",
    "📖",
    "🚢"
];


/* =========================================
   NAMA ANGKA
========================================= */

const numberWords = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh"
];


/* =========================================
   DATA LEVEL
========================================= */

const levels = {

    1: {
        type: "count",

        questions: [
            1, 2, 3, 4, 5,
            6, 7, 8, 9, 10
        ]
    },

    2: {
        type: "addition",

        questions: [
            [1, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5]
        ]
    },

    3: {
        type: "addition",

        questions: [
            [2, 1],
            [2, 2],
            [2, 3],
            [2, 4]
        ]
    },

    4: {
        type: "addition",

        questions: [
            [3, 1],
            [3, 2],
            [3, 3]
        ]
    }

};


/* =========================================
   STATE
========================================= */

let currentLevel = 1;
let questionIndex = 0;
let count = 0;
let correctAnswer = 0;
let answered = false;

let questionObject = "🍎";


/* =========================================
   HTML ELEMENT
========================================= */

const cover =
    document.getElementById("cover");

const game =
    document.getElementById("game");

const finish =
    document.getElementById("finish");

const startButton =
    document.getElementById("startButton");

const restartButton =
    document.getElementById("restartButton");

const singleGroup =
    document.getElementById("singleGroup");

const additionArea =
    document.getElementById("additionArea");

const group1 =
    document.getElementById("group1");

const group2 =
    document.getElementById("group2");

const answers =
    document.getElementById("answers");

const nextButton =
    document.getElementById("nextButton");

const levelIndicator =
    document.getElementById("levelIndicator");


/* =========================================
   ACAK BENDA
========================================= */

function randomObject() {

    const index =
        Math.floor(
            Math.random() *
            objects.length
        );

    return objects[index];
}


/* =========================================
   ACAK ARRAY
========================================= */

function shuffle(array) {

    const newArray =
        [...array];

    for (
        let i = newArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            newArray[i],
            newArray[j]
        ] =
        [
            newArray[j],
            newArray[i]
        ];
    }

    return newArray;
}


/* =========================================
   SUARA
========================================= */

function speak(
    text,
    language = "id-ID"
) {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }

    window.speechSynthesis.cancel();

    window.speechSynthesis.resume();

    const speech =
        new SpeechSynthesisUtterance(
            text
        );

    speech.lang =
        language;

    speech.rate =
        0.75;

    speech.pitch =
        1;

    speech.volume =
        1;

    const voices =
        window.speechSynthesis
            .getVoices();

    const matchingVoice =
        voices.find(
            voice =>
                voice.lang
                    .toLowerCase()
                    .startsWith(
                        language
                            .toLowerCase()
                            .split("-")[0]
                    )
        );

    if (matchingVoice) {
        speech.voice =
            matchingVoice;
    }

    window.speechSynthesis
        .speak(speech);
}


/* =========================================
   PERSIAPAN SUARA
========================================= */

if (
    "speechSynthesis" in window
) {

    window.speechSynthesis
        .getVoices();
}


/* =========================================
   BUAT BENDA
========================================= */

function createObject(parent) {

    const button =
        document.createElement(
            "button"
        );

    button.className =
        "object";


    const picture =
        document.createElement(
            "span"
        );

    picture.className =
        "fruit";

    picture.textContent =
        questionObject;


    const number =
        document.createElement(
            "span"
        );

    number.className =
        "count-number";


    button.appendChild(
        picture
    );

    button.appendChild(
        number
    );


    button.addEventListener(
        "click",
        function () {

            if (
                button.classList.contains(
                    "counted"
                )
            ) {
                return;
            }


            count++;


            number.textContent =
                count;


            button.classList.add(
                "counted"
            );


            speak(
                numberWords[count],
                "id-ID"
            );


            const total =
                getTotalObjects();


            if (
                count === total
            ) {

                enableAnswers();

            }

        }
    );


    parent.appendChild(
        button
    );
}


/* =========================================
   JUMLAH BENDA
========================================= */

function getTotalObjects() {

    const level =
        levels[currentLevel];

    const data =
        level.questions[
            questionIndex
        ];


    if (
        level.type === "count"
    ) {

        return data;

    }


    return data[0] + data[1];
}


/* =========================================
   BUAT SOAL
========================================= */

function createQuestion() {

    count = 0;

    answered = false;

    correctAnswer = 0;

    nextButton.disabled =
        true;


    singleGroup.innerHTML =
        "";

    group1.innerHTML =
        "";

    group2.innerHTML =
        "";

    answers.innerHTML =
        "";


    questionObject =
        randomObject();


    const level =
        levels[currentLevel];


    levelIndicator.textContent =
        "Level " +
        currentLevel;


    /* =================================
       LEVEL 1
    ================================= */

    if (
        level.type === "count"
    ) {

        singleGroup.classList
            .remove("hidden");

        additionArea.classList
            .add("hidden");


        const total =
            level.questions[
                questionIndex
            ];


        correctAnswer =
            total;


        for (
            let i = 0;
            i < total;
            i++
        ) {

            createObject(
                singleGroup
            );

        }

    }


    /* =================================
       LEVEL 2-4
    ================================= */

    else {

        singleGroup.classList
            .add("hidden");

        additionArea.classList
            .remove("hidden");


        const first =
            level.questions[
                questionIndex
            ][0];


        const second =
            level.questions[
                questionIndex
            ][1];


        correctAnswer =
            first + second;


        for (
            let i = 0;
            i < first;
            i++
        ) {

            createObject(
                group1
            );

        }


        for (
            let i = 0;
            i < second;
            i++
        ) {

            createObject(
                group2
            );

        }

    }


    createAnswers();
}


/* =========================================
   PILIHAN JAWABAN
========================================= */

function createAnswers() {

    let wrongAnswer;


    if (
        correctAnswer === 1
    ) {

        wrongAnswer = 2;

    }

    else {

        wrongAnswer =
            correctAnswer + 1;

    }


    const answerList =
        shuffle([
            correctAnswer,
            wrongAnswer
        ]);


    answerList.forEach(
        function (value) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.textContent =
                value;


            button.disabled =
                true;


            button.addEventListener(
                "click",
                function () {

                    checkAnswer(
                        value
                    );

                }
            );


            answers.appendChild(
                button
            );

        }
    );
}


/* =========================================
   AKTIFKAN JAWABAN
========================================= */

function enableAnswers() {

    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(
        function (button) {

            button.disabled =
                false;

        }
    );
}


/* =========================================
   CEK JAWABAN
========================================= */

function checkAnswer(value) {

    if (answered) {
        return;
    }


    if (
        value === correctAnswer
    ) {

        answered = true;


        speak(
            "Good job!",
            "en-US"
        );


        const buttons =
            document.querySelectorAll(
                ".answer"
            );


        buttons.forEach(
            function (button) {

                button.disabled =
                    true;

            }
        );


        nextButton.disabled =
            false;


        document.body.classList
            .add("correct-flash");


        setTimeout(
            function () {

                document.body.classList
                    .remove(
                        "correct-flash"
                    );

            },
            450
        );

    }


    else {

        speak(
            "Try again.",
            "en-US"
        );


        document.body.classList
            .add("wrong-shake");


        setTimeout(
            function () {

                document.body.classList
                    .remove(
                        "wrong-shake"
                    );

            },
            450
        );

    }
}


/* =========================================
   NEXT
========================================= */

nextButton.addEventListener(
    "click",
    function () {

        if (!answered) {
            return;
        }


        game.classList
            .add(
                "question-transition"
            );


        setTimeout(
            function () {

                questionIndex++;


                const totalQuestions =
                    levels[
                        currentLevel
                    ].questions.length;


                if (
                    questionIndex <
                    totalQuestions
                ) {

                    createQuestion();

                }


                else if (
                    currentLevel < 4
                ) {

                    currentLevel++;

                    questionIndex = 0;

                    createQuestion();

                    showLevelTransition();

                }


                else {

                    showFinish();

                }


                game.classList
                    .remove(
                        "question-transition"
                    );

            },
            350
        );

    }
);


/* =========================================
   TRANSISI LEVEL
========================================= */

function showLevelTransition() {

    levelIndicator.classList
        .add("level-pop");


    setTimeout(
        function () {

            levelIndicator.classList
                .remove(
                    "level-pop"
                );

        },
        700
    );
}


/* =========================================
   MULAI
========================================= */

startButton.addEventListener(
    "click",
    function () {

        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis
                .cancel();

            window.speechSynthesis
                .resume();

        }


        cover.classList
            .add("hidden");


        game.classList
            .remove("hidden");


        finish.classList
            .add("hidden");


        currentLevel = 1;

        questionIndex = 0;


        levels[1].questions =
            shuffle([
                1, 2, 3, 4, 5,
                6, 7, 8, 9, 10
            ]);


        createQuestion();

    }
);


/* =========================================
   SELESAI
========================================= */

function showFinish() {

    game.classList
        .add("hidden");


    finish.classList
        .remove("hidden");


    speak(
        "Good job!",
        "en-US"
    );
}


/* =========================================
   ULANGI
========================================= */

restartButton.addEventListener(
    "click",
    function () {

        finish.classList
            .add("hidden");


        game.classList
            .remove("hidden");


        currentLevel = 1;

        questionIndex = 0;


        levels[1].questions =
            shuffle([
                1, 2, 3, 4, 5,
                6, 7, 8, 9, 10
            ]);


        createQuestion();

    }
);
