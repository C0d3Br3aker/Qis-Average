$(function () {
    let gradeAvg = 0;
    let ectsCounter = 0;
    let gradeCounter = 0;
    let modulArray = [];
    let freeAttemptArray = ["NVB", "FVB"];
    const table = $("table tbody");
    table.eq(1).find('tr').each(
        function () {
            let self = $(this);
            let name = self.find("td:eq(1)").text().trim();
            let grade = self.find("td:eq(3)").text().trim().replace(/,/g, '.');
            let ects = self.find("td:eq(5)").text().trim().replace(/,/g, '.');
            let freeAttempt = self.find("td:eq(7)").text().trim();
            let tryNumber = self.find("td:eq(8)").text().trim();
            let annotation = self.find("td:eq(6)").text().trim();
            if ($.isNumeric(grade) && $.isNumeric(ects) && ects > 0 && (!annotation || annotation === "PA") && tryNumber) {
                ects = parseFloat(ects);
                grade = parseFloat(grade);
                if (freeAttempt) {
                    if ($.inArray(freeAttempt, freeAttemptArray) !== -1) {
                        gradeAvg -= modulArray[name]['grade'] * modulArray[name]['ects'];
                    } else {
                        return;
                    }
                } else {
                    gradeCounter++;
                }
                gradeAvg += grade * ects;
                ectsCounter += ects;
                modulArray[name] = {"grade": grade, "ects": ects};
            }
        });
    let total = gradeAvg / ectsCounter;
    const language = $('html').attr('lang');
    let avgString, gradeCounterString;
    if (language === "en") {
        avgString = 'Grade average';
        gradeCounterString = 'modules passed'
    } else {
        avgString = 'Notendurchschnitt';
        gradeCounterString = 'Module bestanden';
    }

    table.eq(1).find("tr:nth-child(2)").after($('<tr style="color: red;">' +
        '<td class="qis_kontoOnTop" valign="top" align="left">' +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" colspan="2" align="left">' +
        avgString + " (" + gradeAvg + "/" + ectsCounter + ")" +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        parseFloat(total).toFixed(2) +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        gradeCounter + " " + gradeCounterString +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        '</td>' +
        '<td class="qis_kontoOnTop" valign="top" align="center">' +
        '</td>' +
        '</tr>'))
});
