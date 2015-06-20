function blurSwitch(num) {
    switch (num) {
    case 0:
        {
            dim = [1 / 1];
            break;
        }
    case 1:
        {
            dim = [1 / 1];
            break;
        }
    case 4:
        {
            dim = [1 / 4, 1 / 4, 1 / 4, 1 / 4];
            break;
        }
    case 9:
        {
            dim = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
            break;
        }
    case 16:
        {
            dim = [1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16, 1 / 16];
            break;
        }
    }
}
