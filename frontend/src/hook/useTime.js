
const useTime = (pastTimestamp) => {
    const nowTimestamp = Date.now(); // Thời điểm hiện tại trong Unix (milliseconds)

    // Chuyển đổi milliseconds thành giây và sau đó thành ngày
    const pastDate = new Date(pastTimestamp);
    const nowDate = new Date(nowTimestamp);

    // Tính thời gian đã trôi qua
    const differenceInTime = nowDate.getTime() - pastDate.getTime();

    // Chuyển đổi thời gian thành giây
    const differenceInSeconds = differenceInTime / 1000;
    let second = 0, minute = 0, hour = 0, day = 0;

    if (differenceInSeconds < 60) {
        second = Math.floor(second);
    } else if (differenceInSeconds < 3600) {
        minute = Math.floor(differenceInSeconds / 60);
        second = differenceInSeconds % 60;
        second = Math.floor(second);
    } else if (differenceInSeconds < 3600 * 24) {
        hour = Math.floor(differenceInSeconds / 3600);
        let remainingSeconds = differenceInSeconds % 3600;
        minute = Math.floor(remainingSeconds / 60);
    } else {
        day = Math.floor(differenceInSeconds / (3600 * 24));
        let remainingSeconds = differenceInSeconds % (3600 * 24);
        hour = Math.floor(remainingSeconds / 3600);
        remainingSeconds %= 3600;
        minute = Math.floor(remainingSeconds / 60);
    }
    let output = ''
    if (day > 0)
        output += day.toString() + ' day ';
    if (hour > 0)
        output += hour.toString() + ' hour ';
    if (minute > 0)
        output += minute.toString() + ' minute ';
    if (second > 0)
        output += second.toString() + ' second ';
    return output;
}

export default useTime;