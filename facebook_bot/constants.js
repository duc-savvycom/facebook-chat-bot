const SENDER_TYPE = {
    BOT: 'BOT',
    USER: 'USER'
};

const BOT_REPLY_TYPE = {
    TEXT: 'TEXT',
    POST: 'POST',
    BUTTONS: 'BUTTONS',
    IMAGE: 'IMAGE',
    VIDEOS: 'VIDEOS'
};

const BUTTON_TYPE = {
    WEB_URL : 'web_url',
    POSTBACK : 'postback'
};

const PAYLOAD = {
    BOOKING_POST: 'BOOKING_POST',
    INFO_POST: 'INFO_POST',
    HELP : 'HELP',
    ANSWER: 'ANSWER'
};

const QUESTIONS = [
    'Nhập số điện thoại của bạn',
    'Bạn là Nam/Nữ?',
    'Chọn chi nhánh bạn muốn đến',
    'Bạn muốn đến ngày nào?',
    'Chọn thời gian trong ngày',
    'Chọn khung giờ phục vụ',
    'Vui lòng để lại ghi chú khác'
];

const ANSWERS = [
    [],
    [
        {
            title: "Nam",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Nữ",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
    ],
    [
        {
            title: "Salon Duc Anh1",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Salon Anh Minh",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Cơ sở Kim Mã",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        }
    ],
    [
        {
            title: "Hôm nay",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Ngày mai",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Ngày kia",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        }
    ],
    [
        {
            title: "Buổi sáng",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Buổi chiều",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "Buổi tối",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        }
    ],
    [
        {
            title: "09:00",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "09:30",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        },
        {
            title: "10:00",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.ANSWER
        }
    ],
    []
];

const INFO = {
    link: 'https://salonhero.vn/'
}

module.exports = { BOT_REPLY_TYPE, BUTTON_TYPE, PAYLOAD, QUESTIONS, SENDER_TYPE, ANSWERS }