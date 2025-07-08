const places = {
  "آذربایجان شرقی": ["مقبره الشعرا", "بازار تبریز", "ائل گلی"],
  "آذربایجان غربی": ["دریاچه ارومیه", "کلیسای سنت استپانوس", "سه گنبد"],
  "اردبیل": ["دریاچه شورابیل", "چشمه های سردابه", "بازار اردبیل"],
  "اصفهان": ["میدان نقش جهان", "سی‌وسه‌پل", "کاخ چهلستون"],
  "البرز": ["پارک چمران", "کاخ سلیمانیه", "سد امیرکبیر"],
  "ایلام": ["قلعه والی", "آبشار وه‌بله", "تنگه کافرین"],
  "بوشهر": ["ساحل ریشهر", "بازار قدیم بوشهر", "موزه دریا"],
  "تهران": ["برج میلاد", "برج آزادی", "کاخ گلستان"],
  "چهارمحال و بختیاری": ["چشمه دیمه", "گردشگاه پیرغار", "آبشار زردلیمه"],
  "خراسان جنوبی": ["قلعه بیرجند", "باغ اکبریه", "کویر لوت"],
  "خراسان رضوی": ["حرم امام رضا", "طرقبه و شاندیز", "پارک وکیل آباد"],
  "خراسان شمالی": ["آبگرم ایوب", "باغ صفی‌آباد", "روستای اسفیدان"],
  "خوزستان": ["زیگورات چغازنبیل", "کاروانسرای دهدز", "پل سفید اهواز"],
  "زنجان": ["گنبد سلطانیه", "رودخانه زنجانرود", "بازار زنجان"],
  "سمنان": ["کویر خارتوران", "برج کاشمر", "جنگل ابر"],
  "سیستان و بلوچستان": ["چابهار", "قلعه ناصری", "دریاچه هامون"],
  "فارس": ["تخت جمشید", "حافظیه", "باغ ارم"],
  "قزوین": ["مجموعه سعدالسلطنه", "کاخ چهلستون قزوین", "دریاچه اوان"],
  "قم": ["حرم حضرت معصومه", "بازار قم", "مسجد جمکران"],
  "کردستان": ["اورامان", "دریاچه زریوار", "پل گاران"],
  "کرمان": ["باغ شاهزاده ماهان", "ارگ بم", "گندم بریان"],
  "کرمانشاه": ["طاق بستان", "بیستون", "سراب نیلوفر"],
  "کهگیلویه و بویراحمد": ["آبشار یاسوج", "دنا", "دریاچه کوه گل"],
  "گلستان": ["جنگل گلستان", "آبشار کبودوال", "کاخ موزه گرگان"],
  "گیلان": ["ماسوله", "ساحل انزلی", "جنگل گیسوم"],
  "لرستان": ["آبشار بیشه", "دریاچه گهر", "پله خواجه"],
  "مازندران": ["ساحل نور", "دریاچه نئور", "جنگل‌های هیرکانی"],
  "مركزی": ["کاخ اراک", "آبشار شمس‌آباد", "تپه میل"],
  "هرمزگان": ["جزیره قشم", "ساحل کیش", "دریاچه نمک"],
  "همدان": ["تپه هگمتانه", "آرامگاه بوعلی سینا", "غار علیصدر"]
};

const provinceSelect = document.getElementById("province");
const placeSection = document.getElementById("place-section");
const commentSection = document.getElementById("comment-section");
const commentsList = document.getElementById("comments-ul");
const commentInput = document.getElementById("comment-input");

let selectedPlace = null;

window.onload = function() {
  // پر کردن استان‌ها
  const provinces = Object.keys(places);
  provinces.forEach(province => {
    const option = document.createElement("option");
    option.value = province;
    option.textContent = province;
    provinceSelect.appendChild(option);
  });
};

function showRandomPlace() {
  const province = provinceSelect.value;

  if (!province) {
    placeSection.textContent = "لطفاً یک استان انتخاب کنید.";
    selectedPlace = null;
    commentSection.style.display = "none";
    commentsList.innerHTML = "";
    return;
  }

  let shownPlaces = JSON.parse(localStorage.getItem(`shown_${province}`)) || [];
  const provincePlaces = places[province];
  const availablePlaces = provincePlaces.filter(p => !shownPlaces.includes(p));

  if (availablePlaces.length === 0) {
    placeSection.textContent = "🎉 همه مکان‌های این استان را مشاهده کرده‌اید!";
    selectedPlace = null; // مکان انتخاب نشده
    commentsList.innerHTML = ""; // پاک کردن کامنت‌ها
    commentSection.style.display = "none"; // مخفی کردن بخش کامنت
    return;
  }

  selectedPlace = availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
  shownPlaces.push(selectedPlace);
  localStorage.setItem(`shown_${province}`, JSON.stringify(shownPlaces));

  placeSection.textContent = `یک مکان دیدنی از استان ${province}: ${selectedPlace}`;
  loadCommentsForSelectedPlace();
}

function loadCommentsForSelectedPlace() {
  commentsList.innerHTML = "";

  if (!selectedPlace) {
    commentSection.style.display = "none";
    return;
  }

  const comments = JSON.parse(localStorage.getItem(`comments_${selectedPlace}`)) || [];

  comments.forEach(comment => {
    const li = document.createElement("li");
    li.textContent = comment;
    commentsList.appendChild(li);
  });

  commentSection.style.display = "block";
}

function addComment() {
  const comment = commentInput.value.trim();

  if (!selectedPlace || !comment) {
    alert("لطفاً یک مکان انتخاب کنید و سپس یک کامنت وارد کنید.");
    return;
  }

  const comments = JSON.parse(localStorage.getItem(`comments_${selectedPlace}`)) || [];
  comments.push(comment);
  localStorage.setItem(`comments_${selectedPlace}`, JSON.stringify(comments));

  const li = document.createElement("li");
  li.textContent = comment;
  commentsList.appendChild(li);

  commentInput.value = "";
}

function resetProgress() {
  if (confirm("آیا مطمئن هستید که می‌خواهید مکان‌های دیده شده این استان را از اول مشاهده کنید؟")) {
    // فقط مکان‌های دیده‌شده را برای استان انتخاب شده پاک می‌کنیم
    const province = provinceSelect.value;
    if (province) {
      localStorage.removeItem(`shown_${province}`);
      showRandomPlace(); // نشان دادن مکان بعدی
    }
  }
}
