//Toast
export const Toast = (title, icon = 'none', duration = 1500, mask = false) => {
    uni.showToast({
        title,
        icon,
        duration,
        mask
    })
}

//Loading
export const ShowLoading = (title = '', mask = false) => {
    uni.showLoading({
        title,
        mask
    });
} 