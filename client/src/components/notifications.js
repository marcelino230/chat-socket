export const stopSpamming = {
    title: "Stop spamming!",
    message: "Do not ruin others chatting experience.",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 2000,
        onScreen: true
    }
}

export const welcome = {
    title: `Welcome!`,
    message: "Please behave and enjoy chatting!",
    type: "default",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 3000,
        onScreen: true
    }
}

export const messageCannotBeLeftBlank = {
    title: 'Try again',
    message: "Please be sure that your message is not left blank",
    type: "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 3000,
        onScreen: true
    }
}

export const userExists = {
    title: 'Try again',
    message: "That username already exists! try another one.",
    type: "danger",
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
        duration: 3000,
        onScreen: true
    }
}