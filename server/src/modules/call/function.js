function checkDNDList(number, DNDList, listIndex = 0) {
    const isDND = DNDList.find(item => item.num === number)
    if (!isDND) {
        return { warnings: undefined, isDND: false }
    }
    const warnings = `CUSTOMER NUMBER ${number} IN ROW ${listIndex + 1} FLAGGED AS DND &#010;`
    return { warnings, isDND: true }
}

module.exports = {
    checkDNDList
}