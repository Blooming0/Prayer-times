let cities = [
    {
        country: "SA",
        cityArabicName: "مكة المكرمة",
        cityIsoName: "Makkah al Mukarramah"
    },
    {
        country: "SA",
        cityArabicName: "المدينة المنورة",
        cityIsoName: "Madinah"
    },
    {
        country: "SA",
        cityArabicName: "جازان",
        cityIsoName: "Jāzān"
    },
    {
        country: "SA",
        cityArabicName: "عسير",
        cityIsoName: "'Asīr"
    },
    {
        country: "SA",
        cityArabicName: "الجوف",
        cityIsoName: "Al Jawf"
    },
    {
        country: "SA",
        cityArabicName: "الباحه",
        cityIsoName: "Al Bāḩah"
    },
    {
        country: "SA",
        cityArabicName: "القصيم",
        cityIsoName: "Al Qaşīm"
    },
    {
        country: "SA",
        cityArabicName: "تبوك",
        cityIsoName: "Tabūk"
    },
]
handler(cities[0].cityIsoName, cities[0].cityArabicName)
for (city of cities) {
    let content = `<option>${city.cityArabicName}</option>`
    document.getElementById("Choose").innerHTML += content
}

document.getElementById("Choose").addEventListener("change", () => {
    let changeCity = document.getElementById("Choose").value
    for (city of cities) {
        if (changeCity == city.cityArabicName) {
            let cityName = city.cityArabicName
            let isoCity = city.cityIsoName
            handler(isoCity, cityName)
        }
    }
})

function handler(isoCity, cityName) {
    let params = {
        country: "SA",
        city: isoCity
    }
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
        .then((response) => {
            let timings = response.data.data.timings
            let date = response.data.data.date.readable
            dayName = response.data.data.date.hijri.weekday.ar
            fillTheTimeAndDate(date, dayName, cityName)
            fillThePrayContent(timings)
        })
}
function fillThePrayContent(timings) {
    let contentPrayers =
        `
                <div class="col-2 ms-1 mt-3 card" id="fajr">
                    <h1 class="prayerText">العشاء</h1>
                    <h1 class="time-prayer">${timings.Isha}</h1>
                </div>
                <div class="col-2 ms-1 mt-3 card" id="dhr">
                    <h1 class="prayerText">المغرب</h1>
                    <h1 class="time-prayer">${timings.Maghrib}</h1>
                </div>
                <div class="col-2 ms-1 mt-3 card" id="asr">
                    <h1 class="prayerText">العصر</h1>
                    <h1 class="time-prayer">${timings.Asr}</h1>
                </div>
                <div class="col-2 ms-1 mt-3 card" id="magrb">
                    <h1 class="prayerText">الظهر</h1>
                    <h1 class="time-prayer">${timings.Dhuhr}</h1>
                </div>
                <div class="col-2 ms-1 mt-3 card" id="esha">
                    <h1 class="prayerText">الفجر</h1>
                    <h1 class="time-prayer">${timings.Fajr}</h1>
                </div>
            `
    document.getElementById("prayers").innerHTML = contentPrayers
}

function fillTheTimeAndDate(date, dayName, cityName) {
    let timeAndDate =
        `
                <div class="row p-1">
                    <h1 class="col-6" style="text-align: end; ">${date}/${dayName}</h3>
                    <h1 class="col-3" style="text-align: end; font-size: 50px;">${cityName}</h1>
                </div>
            `
    document.getElementById("time&date").innerHTML = timeAndDate
}





