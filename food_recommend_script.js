    const APP_CONFIG = {
      // Replace with your Kakao JavaScript key when issued.
      kakaoJsKey: "7620a85acc48c83e31715bb81fb0e3b3",
      // Replace with your Kakao REST API key if you later add REST-based requests or a proxy layer.
      kakaoRestApiKey: "YOUR_KAKAO_REST_API_KEY",
      defaultLocation: {
        lat: 37.5665,
        lng: 126.9780,
        label: "서울 시청 기준 샘플 위치"
      },
      searchRadius: 1800
    };

    const CATEGORIES = [
      { key: "all", label: "전체 맛집", description: "근처 인기 후보를 넓게 확인" },
      { key: "korean", label: "한식", description: "국밥, 고기, 백반, 분식" },
      { key: "japanese", label: "일식", description: "라멘, 스시, 돈카츠, 우동" },
      { key: "chinese", label: "중식", description: "짬뽕, 짜장, 딤섬, 마라" },
      { key: "western", label: "양식", description: "파스타, 스테이크, 브런치" },
      { key: "asian", label: "아시안", description: "태국, 베트남, 인도, 멕시칸" },
      { key: "fastfood", label: "패스트푸드", description: "버거, 핫도그, 샌드위치" },
      { key: "cafe", label: "카페/디저트", description: "카페, 베이커리, 디저트" }
    ];

    const SAMPLE_PLACES = [
      {
        id: "sample-1",
        name: "남산골 불고기 다이닝",
        category: "korean",
        menus: ["직화 불고기", "된장찌개", "육회비빔밥"],
        distance: 420,
        address: "서울 중구 퇴계로 108",
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/26442015",
        x: 126.9895,
        y: 37.5609
      },
      {
        id: "sample-2",
        name: "사쿠라 돈카츠 바",
        category: "japanese",
        menus: ["로스카츠", "냉모밀", "에비카츠"],
        distance: 680,
        address: "서울 중구 을지로 29",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/13540979",
        x: 126.9831,
        y: 37.5661
      },
      {
        id: "sample-3",
        name: "황금성 마라웍",
        category: "chinese",
        menus: ["마라샹궈", "차돌짬뽕", "유린기"],
        distance: 860,
        address: "서울 종로구 종로 64",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/7869412",
        x: 126.9878,
        y: 37.5701
      },
      {
        id: "sample-4",
        name: "몽마르트 브런치 키친",
        category: "western",
        menus: ["트러플 파스타", "리코타 샐러드", "채끝 스테이크"],
        distance: 510,
        address: "서울 중구 세종대로 18길 16",
        image: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8d4b?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/11425617",
        x: 126.9767,
        y: 37.5651
      },
      {
        id: "sample-5",
        name: "하노이 로터스 누들",
        category: "asian",
        menus: ["양지쌀국수", "분짜", "짜조"],
        distance: 940,
        address: "서울 중구 남대문로 64",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/28080669",
        x: 126.9818,
        y: 37.5633
      },
      {
        id: "sample-6",
        name: "네온 버거 스테이션",
        category: "fastfood",
        menus: ["더블 치즈버거", "갈릭 프라이", "스파이시 윙"],
        distance: 730,
        address: "서울 중구 청계천로 40",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/22494299",
        x: 126.9854,
        y: 37.5689
      },
      {
        id: "sample-7",
        name: "루프탑 크림라떼 하우스",
        category: "cafe",
        menus: ["크림라떼", "딸기 타르트", "소금빵"],
        distance: 310,
        address: "서울 중구 명동길 26",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/12101738",
        x: 126.9851,
        y: 37.5639
      },
      {
        id: "sample-8",
        name: "서울식당 골목집",
        category: "korean",
        menus: ["제육볶음", "김치찌개", "계란말이"],
        distance: 1120,
        address: "서울 종로구 우정국로 12",
        image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/27338473",
        x: 126.9843,
        y: 37.5726
      },
      {
        id: "sample-9",
        name: "오사카 우동 클럽",
        category: "japanese",
        menus: ["니꾸우동", "가라아게", "유부초밥"],
        distance: 1270,
        address: "서울 중구 을지로 43길 12",
        image: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/10312166",
        x: 126.9912,
        y: 37.5667
      },
      {
        id: "sample-10",
        name: "브릭오븐 피자룸",
        category: "western",
        menus: ["마르게리타", "라자냐", "버섯 리소토"],
        distance: 1540,
        address: "서울 중구 서소문로 11길 24",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
        placeUrl: "https://place.map.kakao.com/27536418",
        x: 126.9738,
        y: 37.5642
      }
    ];

    const KAKAO_CATEGORY_CODE = "FD6";
    const KAKAO_CATEGORY_GALLERY = {
      all: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"
      ],
      korean: [
        "https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=1200&q=80"
      ],
      japanese: [
        "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80"
      ],
      chinese: [
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1200&q=80"
      ],
      western: [
        "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8d4b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
      ],
      asian: [
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80"
      ],
      fastfood: [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=1200&q=80"
      ],
      cafe: [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=1200&q=80"
      ]
    };

    const state = {
      location: null,
      locationLabel: "",
      source: "sample",
      selectedCategory: "all",
      allCandidates: [],
      categoryAvailability: {},
      candidates: [],
      currentIndex: 0
    };

    const progressText = document.getElementById("progressText");
    const locationBannerValue = document.getElementById("locationBannerValue");
    const locationBannerMeta = document.getElementById("locationBannerMeta");
    const locationStage = document.getElementById("locationStage");
    const categoryStage = document.getElementById("categoryStage");
    const resultStage = document.getElementById("resultStage");
    const locationStatus = document.getElementById("locationStatus");
    const locationNote = document.getElementById("locationNote");
    const sourceStatus = document.getElementById("sourceStatus");
    const sourceNote = document.getElementById("sourceNote");
    const categoryGrid = document.getElementById("categoryGrid");
    const categoryCopy = document.getElementById("categoryCopy");
    const resultCopy = document.getElementById("resultCopy");
    const activeCategoryChip = document.getElementById("activeCategoryChip");
    const countChip = document.getElementById("countChip");
    const recommendCard = document.getElementById("recommendCard");
    const recommendImage = document.getElementById("recommendImage");
    const recommendImageTrack = document.getElementById("recommendImageTrack");
    const recommendBadge = document.getElementById("recommendBadge");
    const slideDots = document.getElementById("slideDots");
    const placeName = document.getElementById("placeName");
    const placeSummary = document.getElementById("placeSummary");
    const menuList = document.getElementById("menuList");
    const distanceText = document.getElementById("distanceText");
    const addressText = document.getElementById("addressText");
    const mapLinkButton = document.getElementById("mapLinkButton");
    const emptyState = document.getElementById("emptyState");
    const requestLocationButton = document.getElementById("requestLocationButton");
    const continueSampleButton = document.getElementById("continueSampleButton");
    const backToLocationButton = document.getElementById("backToLocationButton");
    const randomRecommendButton = document.getElementById("randomRecommendButton");
    const nextRecommendButton = document.getElementById("nextRecommendButton");
    const restartButton = document.getElementById("restartButton");
    let imageRotationTimer = null;

    function syncLocationBanner(metaText = "") {
      const hasLocation = Boolean(state.location);
      locationBannerValue.textContent = hasLocation ? state.locationLabel : "위치 미확인";

      if (!hasLocation) {
        locationBannerMeta.textContent = metaText || "현재 위치를 연결하면 이 영역에 탐색 기준 위치가 표시됩니다.";
        return;
      }

      const lat = Number(state.location.lat).toFixed(4);
      const lng = Number(state.location.lng).toFixed(4);
      locationBannerMeta.textContent = metaText || `위도 ${lat}, 경도 ${lng} 기준으로 주변 음식점을 탐색합니다.`;
    }

    function showStage(stageName) {
      const stageMap = {
        location: locationStage,
        category: categoryStage,
        result: resultStage
      };

      Object.entries(stageMap).forEach(([key, element]) => {
        element.classList.toggle("active", key === stageName);
      });

      if (stageName === "location") {
        progressText.textContent = "1단계 · 위치 확인";
      } else if (stageName === "category") {
        progressText.textContent = "2단계 · 카테고리 선택";
      } else {
        progressText.textContent = "3단계 · 추천 카드";
      }
    }

    function renderCategories() {
      categoryGrid.innerHTML = "";

      CATEGORIES.forEach((category) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "category-button";
        const isDisabled = category.key !== "all" && state.categoryAvailability[category.key] === 0;
        button.innerHTML = `
          <span class="category-name">${category.label}</span>
          <span class="category-desc">${category.description}</span>
        `;

        if (state.selectedCategory === category.key) {
          button.classList.add("active");
        }

        if (typeof state.categoryAvailability[category.key] === "number") {
          const count = state.categoryAvailability[category.key];
          button.innerHTML += `<span class="category-desc">${count > 0 ? `${count}곳 발견` : "주변 후보 없음"}</span>`;
        }

        if (isDisabled) {
          button.disabled = true;
          button.setAttribute("aria-disabled", "true");
        }

        button.addEventListener("click", async () => {
          if (isDisabled) {
            return;
          }
          state.selectedCategory = category.key;
          renderCategories();
          await loadCandidatesForCategory(category.key);
          showStage("result");
        });

        categoryGrid.appendChild(button);
      });
    }

    function normalizeCategory(text = "") {
      const lower = text.toLowerCase();

      if (lower.includes("카페") || lower.includes("디저트") || lower.includes("베이커리")) {
        return "cafe";
      }
      if (lower.includes("한식") || lower.includes("분식") || lower.includes("국밥") || lower.includes("백반")) {
        return "korean";
      }
      if (lower.includes("일식") || lower.includes("초밥") || lower.includes("스시") || lower.includes("우동") || lower.includes("라멘") || lower.includes("돈까스")) {
        return "japanese";
      }
      if (lower.includes("중식") || lower.includes("중국") || lower.includes("마라") || lower.includes("딤섬") || lower.includes("짬뽕") || lower.includes("짜장")) {
        return "chinese";
      }
      if (lower.includes("양식") || lower.includes("파스타") || lower.includes("브런치") || lower.includes("스테이크") || lower.includes("피자")) {
        return "western";
      }
      if (lower.includes("베트남") || lower.includes("태국") || lower.includes("인도") || lower.includes("멕시칸") || lower.includes("아시안")) {
        return "asian";
      }
      if (lower.includes("햄버거") || lower.includes("버거") || lower.includes("샌드위치") || lower.includes("패스트")) {
        return "fastfood";
      }

      return "all";
    }

    function buildFallbackMapLink(place) {
      if (place.placeUrl) {
        return place.placeUrl;
      }

      if (place.x && place.y) {
        return `https://map.kakao.com/link/map/${encodeURIComponent(place.name)},${place.y},${place.x}`;
      }

      return `https://map.kakao.com/link/search/${encodeURIComponent(place.name)}`;
    }

    function formatDistance(distance) {
      const numeric = Number(distance || 0);
      return numeric >= 1000 ? `${(numeric / 1000).toFixed(1)}km` : `${Math.round(numeric)}m`;
    }

    function calculateDistanceMeters(from, to) {
      const toRad = (value) => (value * Math.PI) / 180;
      const earthRadius = 6371000;
      const dLat = toRad(to.lat - from.lat);
      const dLng = toRad(to.lng - from.lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(earthRadius * c);
    }

    function getSampleCandidates(categoryKey) {
      const baseLocation = state.location || APP_CONFIG.defaultLocation;
      const filtered = SAMPLE_PLACES
        .filter((place) => categoryKey === "all" || place.category === categoryKey)
        .map((place) => ({
          ...place,
          distance: place.distance || calculateDistanceMeters(baseLocation, { lat: place.y, lng: place.x }),
          source: "sample",
          badge: "Sample Pick"
        }));

      return filtered.sort((a, b) => a.distance - b.distance);
    }

    function getCandidatesFromPool(categoryKey, pool) {
      return pool.filter((place) => categoryKey === "all" || place.category === categoryKey);
    }

    function buildCategoryAvailability(pool) {
      return CATEGORIES.reduce((accumulator, category) => {
        accumulator[category.key] = getCandidatesFromPool(category.key, pool).length;
        return accumulator;
      }, {});
    }

    function buildPlaceInfoItems(place) {
      if (place.source === "kakao") {
        return [
          place.categoryName || "음식점",
          place.phone || "전화번호 미등록",
          place.address || "주소 정보 없음"
        ];
      }

      return place.menus.slice(0, 3);
    }

    function buildPlaceSummary(place) {
      if (place.source === "kakao") {
        const phoneText = place.phone ? `전화 ${place.phone}` : "전화번호 미등록";
        return `${place.categoryName || "음식점"} · ${phoneText} · 카카오맵 상세에서 사진과 추가 정보를 확인하세요.`;
      }

      return "?섑뵆 ?곗씠???④퀎?먯꽌??????대?吏 1?κ낵 ?듭떖 ?뺣낫 以묒떖?쇰줈 ?뚯뒪?명븷 ???덉뒿?덈떎.";
    }

    async function prepareCategoryAvailability() {
      let pool = [];

      if (hasKakaoJsKey()) {
        try {
          await loadKakaoSdk();
          pool = await fetchKakaoCandidates("all");
          state.source = "kakao";
          sourceStatus.textContent = "카카오 Places API 연결됨";
          sourceNote.textContent = "실제 주변 음식점 데이터를 기준으로 후보를 가져왔습니다.";
        } catch (error) {
          pool = getSampleCandidates("all");
          state.source = "sample";
          sourceStatus.textContent = "샘플 맛집 데이터 사용 중";
          sourceNote.textContent = "카카오 연동에 실패해 샘플 데이터로 대체했습니다.";
        }
      } else {
        pool = getSampleCandidates("all");
        state.source = "sample";
        sourceStatus.textContent = "샘플 맛집 데이터 사용 중";
        sourceNote.textContent = "카카오 JS 키를 넣기 전이라 샘플 데이터로 추천을 제공합니다.";
      }

      state.allCandidates = pool;
      state.categoryAvailability = buildCategoryAvailability(pool);
    }

    function transformKakaoPlace(place) {
      const category = normalizeCategory(`${place.category_name || ""} ${place.place_name || ""}`);
      const gallery = KAKAO_CATEGORY_GALLERY[category] || KAKAO_CATEGORY_GALLERY.all;
      return {
        id: place.id,
        name: place.place_name,
        category,
        menus: ["대표 메뉴 확인 필요", "현장 방문 추천", "카카오 상세 연동 예정"],
        distance: Number(place.distance || 0),
        address: place.road_address_name || place.address_name || "주소 정보 없음",
        image: gallery[0],
        imageSet: gallery.slice(0, 3),
        placeUrl: place.place_url,
        x: Number(place.x),
        y: Number(place.y),
        source: "kakao",
        badge: "Kakao Places"
      };
    }

    function stopImageRotation() {
      if (imageRotationTimer) {
        window.clearInterval(imageRotationTimer);
        imageRotationTimer = null;
      }
    }

    function renderImageSlides(images) {
      stopImageRotation();
      recommendImageTrack.innerHTML = "";
      slideDots.innerHTML = "";

      const safeImages = images.filter(Boolean).slice(0, 3);

      if (safeImages.length <= 1) {
        recommendImage.style.backgroundImage = safeImages[0] ? `url("${safeImages[0]}")` : "";
        slideDots.hidden = true;
        return;
      }

      recommendImage.style.backgroundImage = "";

      safeImages.forEach((image, index) => {
        const slide = document.createElement("div");
        slide.className = `recommend-image-slide${index === 0 ? " active" : ""}`;
        slide.style.backgroundImage = `url("${image}")`;
        recommendImageTrack.appendChild(slide);

        const dot = document.createElement("span");
        dot.className = `slide-dot${index === 0 ? " active" : ""}`;
        slideDots.appendChild(dot);
      });

      slideDots.hidden = false;

      let currentSlide = 0;
      imageRotationTimer = window.setInterval(() => {
        const slides = recommendImageTrack.querySelectorAll(".recommend-image-slide");
        const dots = slideDots.querySelectorAll(".slide-dot");

        if (!slides.length) {
          stopImageRotation();
          return;
        }

        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
      }, 2800);
    }

    function hasKakaoJsKey() {
      return APP_CONFIG.kakaoJsKey && APP_CONFIG.kakaoJsKey !== "YOUR_KAKAO_JS_KEY";
    }

    function loadKakaoSdk() {
      return new Promise((resolve, reject) => {
        if (!hasKakaoJsKey()) {
          reject(new Error("missing_kakao_key"));
          return;
        }

        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          resolve();
          return;
        }

        const existingScript = document.querySelector('script[data-kakao-sdk="true"]');

        if (existingScript) {
          existingScript.addEventListener("load", () => resolve(), { once: true });
          existingScript.addEventListener("error", () => reject(new Error("kakao_sdk_load_failed")), { once: true });
          return;
        }

        const script = document.createElement("script");
        script.dataset.kakaoSdk = "true";
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_CONFIG.kakaoJsKey}&libraries=services&autoload=false`;
        script.onload = () => {
          window.kakao.maps.load(resolve);
        };
        script.onerror = () => reject(new Error("kakao_sdk_load_failed"));
        document.head.appendChild(script);
      });
    }

    function fetchKakaoCandidates(categoryKey) {
      return new Promise((resolve, reject) => {
        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
          reject(new Error("kakao_services_unavailable"));
          return;
        }

        const service = new window.kakao.maps.services.Places();
        const origin = state.location || APP_CONFIG.defaultLocation;

        service.categorySearch(
          KAKAO_CATEGORY_CODE,
          (data, status) => {
            if (status !== window.kakao.maps.services.Status.OK) {
              reject(new Error(`kakao_status_${status}`));
              return;
            }

            const transformed = data.map(transformKakaoPlace);
            const filtered = transformed.filter((place) => categoryKey === "all" || place.category === categoryKey);
            resolve(filtered);
          },
          {
            location: new window.kakao.maps.LatLng(origin.lat, origin.lng),
            radius: APP_CONFIG.searchRadius,
            sort: window.kakao.maps.services.SortBy.DISTANCE,
            size: 15
          }
        );
      });
    }

    async function loadCandidatesForCategory(categoryKey) {
      const categoryLabel = CATEGORIES.find((category) => category.key === categoryKey)?.label || "전체 맛집";
      categoryCopy.textContent = `${state.locationLabel} 기준으로 ${categoryLabel} 후보를 준비합니다.`;
      activeCategoryChip.textContent = `카테고리 · ${categoryLabel}`;
      resultCopy.textContent = `${state.locationLabel} 기준 추천 결과입니다. 마음에 들지 않으면 다음 추천이나 랜덤 추천으로 넘겨보세요.`;

      let candidates = [];

      if (hasKakaoJsKey()) {
        try {
          await loadKakaoSdk();
          candidates = await fetchKakaoCandidates(categoryKey);
          state.source = "kakao";
          sourceStatus.textContent = "카카오 Places API 연결됨";
          sourceNote.textContent = "실제 주변 음식점 데이터를 기준으로 후보를 가져왔습니다.";
        } catch (error) {
          candidates = getSampleCandidates(categoryKey);
          state.source = "sample";
          sourceStatus.textContent = "샘플 맛집 데이터 사용 중";
          sourceNote.textContent = "카카오 연동에 실패해 샘플 데이터로 대체했습니다.";
        }
      } else {
        candidates = getSampleCandidates(categoryKey);
        state.source = "sample";
        sourceStatus.textContent = "샘플 맛집 데이터 사용 중";
        sourceNote.textContent = "카카오 JS 키를 넣기 전이라 샘플 데이터로 추천을 제공합니다.";
      }

      state.candidates = candidates;
      state.currentIndex = 0;
      renderCurrentCandidate();
    }

    function renderCurrentCandidate() {
      if (!state.candidates.length) {
        recommendCard.hidden = true;
        emptyState.hidden = false;
        countChip.textContent = "0 / 0";
        return;
      }

      recommendCard.hidden = false;
      emptyState.hidden = true;

      const place = state.candidates[state.currentIndex];
      countChip.textContent = `${state.currentIndex + 1} / ${state.candidates.length}`;
      recommendBadge.textContent = place.badge || (place.source === "kakao" ? "Kakao Places" : "Sample Pick");
      renderImageSlides(place.imageSet && place.imageSet.length ? place.imageSet : [place.image]);
      placeName.textContent = place.name;
      placeSummary.textContent =
        place.source === "kakao"
          ? "실제 주변 검색 결과를 기준으로 상단 이미지를 2~3장 순환 표시합니다."
          : "샘플 데이터 단계에서는 대표 이미지 1장과 핵심 정보 중심으로 테스트할 수 있습니다.";
      distanceText.textContent = formatDistance(place.distance);
      addressText.textContent = place.address;
      mapLinkButton.href = buildFallbackMapLink(place);

      menuList.innerHTML = "";
      place.menus.slice(0, 3).forEach((menu) => {
        const pill = document.createElement("span");
        pill.className = "menu-pill";
        pill.textContent = menu;
        menuList.appendChild(pill);
      });
    }

    function nextCandidate() {
      if (!state.candidates.length) {
        return;
      }

      state.currentIndex = (state.currentIndex + 1) % state.candidates.length;
      renderCurrentCandidate();
    }

    function randomCandidate() {
      if (!state.candidates.length) {
        return;
      }

      if (state.candidates.length === 1) {
        renderCurrentCandidate();
        return;
      }

      let nextIndex = state.currentIndex;
      while (nextIndex === state.currentIndex) {
        nextIndex = Math.floor(Math.random() * state.candidates.length);
      }

      state.currentIndex = nextIndex;
      renderCurrentCandidate();
    }

    function goToCategoryStage() {
      showStage("category");
      renderCategories();
    }

    function resetToStart() {
      stopImageRotation();
      state.location = null;
      state.locationLabel = "";
      state.allCandidates = [];
      state.categoryAvailability = {};
      state.selectedCategory = "all";
      state.candidates = [];
      state.currentIndex = 0;
      renderCategories();
      locationStatus.textContent = "아직 위치를 확인하지 않았습니다.";
      locationNote.textContent = "현재 위치 확인을 누르면 브라우저 권한 요청이 표시됩니다.";
      syncLocationBanner();
      showStage("location");
    }

    function syncLocationBanner(metaText = "") {
      const hasLocation = Boolean(state.location);
      locationBannerValue.textContent = hasLocation ? state.locationLabel : "위치 미확인";

      if (!hasLocation) {
        locationBannerMeta.textContent = metaText || "현재 위치를 연결하면 이 영역에 탐색 기준 위치가 표시됩니다.";
        return;
      }

      locationBannerMeta.textContent = metaText || `${state.locationLabel} 기준으로 주변 음식점을 탐색합니다.`;
    }

    async function resolveLocationLabel(lat, lng) {
      try {
        await loadKakaoSdk();

        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
          return null;
        }

        return await new Promise((resolve) => {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2Address(lng, lat, (result, status) => {
            if (status !== window.kakao.maps.services.Status.OK || !Array.isArray(result) || !result[0]) {
              resolve(null);
              return;
            }

            const roadAddress = result[0].road_address && result[0].road_address.address_name;
            const jibunAddress = result[0].address && result[0].address.address_name;
            resolve(roadAddress || jibunAddress || null);
          });
        });
      } catch (error) {
        return null;
      }
    }

    function applySampleLocation(reasonText) {
      state.location = { ...APP_CONFIG.defaultLocation };
      state.locationLabel = APP_CONFIG.defaultLocation.label;
      locationStatus.textContent = "샘플 위치를 사용합니다.";
      locationNote.textContent = reasonText;
      syncLocationBanner(`샘플 기준 위치입니다. ${reasonText}`);
      goToCategoryStage();
    }

    function requestCurrentLocation() {
      if (!navigator.geolocation) {
        applySampleLocation("이 브라우저는 위치 정보를 지원하지 않아 서울 시청 기준 샘플 위치로 시작합니다.");
        return;
      }

      locationStatus.textContent = "현재 위치를 확인하는 중입니다.";
      locationNote.textContent = "브라우저 권한 응답을 기다리고 있습니다.";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          state.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          state.locationLabel = "현재 위치";
          locationStatus.textContent = "현재 위치를 확인했습니다.";
          locationNote.textContent = `위도 ${position.coords.latitude.toFixed(4)}, 경도 ${position.coords.longitude.toFixed(4)} 기준으로 탐색합니다.`;
          goToCategoryStage();
        },
        () => {
          applySampleLocation("위치 권한을 허용하지 않았거나 좌표를 가져오지 못해 서울 시청 기준 샘플 위치로 시작합니다.");
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 60000
        }
      );
    }

    function applySampleLocation(reasonText) {
      state.location = { ...APP_CONFIG.defaultLocation };
      state.locationLabel = APP_CONFIG.defaultLocation.label;
      locationStatus.textContent = "샘플 위치를 사용합니다.";
      locationNote.textContent = reasonText;
      syncLocationBanner(`샘플 기준 위치입니다. ${reasonText}`);
      goToCategoryStage();
    }

    function requestCurrentLocation() {
      if (!navigator.geolocation) {
        applySampleLocation("이 브라우저는 위치 정보를 지원하지 않아 서울 시청 기준 샘플 위치로 시작합니다.");
        return;
      }

      locationStatus.textContent = "현재 위치를 확인하는 중입니다.";
      locationNote.textContent = "브라우저 권한 응답을 기다리고 있습니다.";
      syncLocationBanner("브라우저 위치 권한 응답을 기다리고 있습니다.");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          state.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const resolvedAddress = await resolveLocationLabel(position.coords.latitude, position.coords.longitude);
          state.locationLabel = resolvedAddress || "현재 위치";
          locationStatus.textContent = "현재 위치를 확인했습니다.";
          locationNote.textContent = resolvedAddress
            ? `${resolvedAddress} 기준으로 탐색합니다.`
            : `위도 ${position.coords.latitude.toFixed(4)}, 경도 ${position.coords.longitude.toFixed(4)} 기준으로 탐색합니다.`;
          syncLocationBanner(
            resolvedAddress
              ? `${resolvedAddress} 기준으로 주변 음식점을 탐색합니다.`
              : `위도 ${position.coords.latitude.toFixed(4)}, 경도 ${position.coords.longitude.toFixed(4)} 기준으로 주변 음식점을 탐색합니다.`
          );
          goToCategoryStage();
        },
        () => {
          applySampleLocation("위치 권한을 허용하지 않았거나 좌표를 가져오지 못해 서울 시청 기준 샘플 위치로 시작합니다.");
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 60000
        }
      );
    }

    function resetToStart() {
      stopImageRotation();
      state.location = null;
      state.locationLabel = "";
      state.selectedCategory = "all";
      state.candidates = [];
      state.currentIndex = 0;
      renderCategories();
      locationStatus.textContent = "아직 위치를 확인하지 않았습니다.";
      locationNote.textContent = "현재 위치 확인을 누르면 브라우저 권한 요청이 표시됩니다.";
      syncLocationBanner();
      showStage("location");
    }

    function buildPlaceInfoItems(place) {
      if (place.source === "kakao") {
        return [
          place.categoryName || "음식점",
          place.phone || "전화번호 미등록",
          place.address || "주소 정보 없음"
        ];
      }

      return place.menus.slice(0, 3);
    }

    function buildPlaceSummary(place) {
      if (place.source === "kakao") {
        const phoneText = place.phone ? `전화 ${place.phone}` : "전화번호 미등록";
        return `${place.categoryName || "음식점"} · ${phoneText} · 카카오 공개 API로 제공되는 기본 장소 정보를 표시합니다.`;
      }

      return "샘플 데이터 기준으로 표시한 카드입니다.";
    }

    function syncLocationBanner(metaText = "") {
      const hasLocation = Boolean(state.location);
      locationBannerValue.textContent = hasLocation ? state.locationLabel : "위치 미확인";

      if (!hasLocation) {
        locationBannerMeta.textContent = metaText || "현재 위치를 연결하면 이 영역에 탐색 기준 위치가 표시됩니다.";
        return;
      }

      locationBannerMeta.textContent = metaText || `${state.locationLabel} 기준으로 주변 음식점을 탐색합니다.`;
    }

    function applySampleLocation(reasonText) {
      state.location = { ...APP_CONFIG.defaultLocation };
      state.locationLabel = APP_CONFIG.defaultLocation.label;
      locationStatus.textContent = "샘플 위치를 사용합니다.";
      locationNote.textContent = reasonText;
      syncLocationBanner(`샘플 기준 위치입니다. ${reasonText}`);
      goToCategoryStage();
    }

    function requestCurrentLocation() {
      if (!navigator.geolocation) {
        applySampleLocation("이 브라우저는 위치 정보를 지원하지 않아 서울 시청 기준 샘플 위치로 시작합니다.");
        return;
      }

      locationStatus.textContent = "현재 위치를 확인하는 중입니다.";
      locationNote.textContent = "브라우저 권한 응답을 기다리고 있습니다.";
      syncLocationBanner("브라우저 위치 권한 응답을 기다리고 있습니다.");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          state.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const resolvedAddress = await resolveLocationLabel(position.coords.latitude, position.coords.longitude);
          state.locationLabel = resolvedAddress || "현재 위치";
          locationStatus.textContent = "현재 위치를 확인했습니다.";
          locationNote.textContent = resolvedAddress
            ? `${resolvedAddress} 기준으로 탐색합니다.`
            : `위도 ${position.coords.latitude.toFixed(4)}, 경도 ${position.coords.longitude.toFixed(4)} 기준으로 탐색합니다.`;
          syncLocationBanner(
            resolvedAddress
              ? `${resolvedAddress} 기준으로 주변 음식점을 탐색합니다.`
              : `위도 ${position.coords.latitude.toFixed(4)}, 경도 ${position.coords.longitude.toFixed(4)} 기준으로 주변 음식점을 탐색합니다.`
          );
          goToCategoryStage();
        },
        () => {
          applySampleLocation("위치 권한을 허용하지 않았거나 좌표를 가져오지 못해 서울 시청 기준 샘플 위치로 시작합니다.");
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 60000
        }
      );
    }

    function transformKakaoPlace(place) {
      const category = normalizeCategory(`${place.category_name || ""} ${place.place_name || ""}`);
      const address = place.road_address_name || place.address_name || "주소 정보 없음";
      return {
        id: place.id,
        name: place.place_name,
        category,
        menus: buildPlaceInfoItems({
          source: "kakao",
          categoryName: place.category_name,
          phone: place.phone,
          address
        }),
        distance: Number(place.distance || 0),
        address,
        image: "",
        imageSet: [],
        placeUrl: place.place_url,
        x: Number(place.x),
        y: Number(place.y),
        phone: place.phone || "",
        categoryName: place.category_name || "",
        summary: buildPlaceSummary({
          source: "kakao",
          categoryName: place.category_name,
          phone: place.phone
        }),
        source: "kakao",
        badge: "Kakao Places"
      };
    }

    async function prepareCategoryAvailability() {
      let pool = [];

      if (hasKakaoJsKey()) {
        try {
          await loadKakaoSdk();
          pool = await fetchKakaoCandidates("all");
          state.source = "kakao";
          sourceStatus.textContent = "카카오 Places API 연결됨";
          sourceNote.textContent = "실제 주변 음식점 데이터를 기준으로 카테고리 후보를 계산했습니다.";
        } catch (error) {
          pool = getSampleCandidates("all");
          state.source = "sample";
          sourceStatus.textContent = "샘플 맛집 데이터 사용 중";
          sourceNote.textContent = "카카오 연동에 실패해 샘플 데이터로 대체했습니다.";
        }
      } else {
        pool = getSampleCandidates("all");
        state.source = "sample";
        sourceStatus.textContent = "샘플 맛집 데이터 사용 중";
        sourceNote.textContent = "카카오 JS 키를 넣기 전이라 샘플 데이터로 추천을 제공합니다.";
      }

      state.allCandidates = pool;
      state.categoryAvailability = buildCategoryAvailability(pool);
    }

    async function loadCandidatesForCategory(categoryKey) {
      const categoryLabel = CATEGORIES.find((category) => category.key === categoryKey)?.label || "전체 맛집";
      categoryCopy.textContent = `${state.locationLabel} 기준으로 ${categoryLabel} 후보를 준비합니다.`;
      activeCategoryChip.textContent = `카테고리 · ${categoryLabel}`;
      resultCopy.textContent = `${state.locationLabel} 기준 추천 결과입니다. 마음에 들지 않으면 다음 추천이나 랜덤 추천으로 넘겨보세요.`;

      if (!state.allCandidates.length) {
        await prepareCategoryAvailability();
      }

      state.candidates = getCandidatesFromPool(categoryKey, state.allCandidates);
      state.currentIndex = 0;
      renderCurrentCandidate();
    }

    function renderCurrentCandidate() {
      if (!state.candidates.length) {
        recommendCard.hidden = true;
        emptyState.hidden = false;
        countChip.textContent = "0 / 0";
        return;
      }

      recommendCard.hidden = false;
      emptyState.hidden = true;

      const place = state.candidates[state.currentIndex];
      countChip.textContent = `${state.currentIndex + 1} / ${state.candidates.length}`;
      recommendBadge.textContent = place.badge || (place.source === "kakao" ? "Kakao Places" : "Sample Pick");
      renderImageSlides(place.imageSet && place.imageSet.length ? place.imageSet : [place.image]);
      placeName.textContent = place.name;
      placeSummary.textContent = place.summary || buildPlaceSummary(place);
      distanceText.textContent = formatDistance(place.distance);
      addressText.textContent = place.source === "kakao"
        ? `${place.address}${place.phone ? ` · ${place.phone}` : ""}`
        : place.address;
      mapLinkButton.href = buildFallbackMapLink(place);

      menuList.innerHTML = "";
      buildPlaceInfoItems(place).slice(0, 3).forEach((item) => {
        const pill = document.createElement("span");
        pill.className = "menu-pill";
        pill.textContent = item;
        menuList.appendChild(pill);
      });
    }

    async function goToCategoryStage() {
      state.categoryAvailability = {};
      await prepareCategoryAvailability();
      showStage("category");
      renderCategories();
    }

    function resetToStart() {
      stopImageRotation();
      state.location = null;
      state.locationLabel = "";
      state.allCandidates = [];
      state.categoryAvailability = {};
      state.selectedCategory = "all";
      state.candidates = [];
      state.currentIndex = 0;
      renderCategories();
      locationStatus.textContent = "아직 위치를 확인하지 않았습니다.";
      locationNote.textContent = "현재 위치 확인을 누르면 브라우저 권한 요청이 표시됩니다.";
      syncLocationBanner();
      showStage("location");
    }

    const metaLabels = recommendCard.querySelectorAll(".meta-label");
    if (metaLabels[0]) {
      metaLabels[0].textContent = "장소 정보";
    }
    if (metaLabels[2]) {
      metaLabels[2].textContent = "기본 정보";
    }

    requestLocationButton.addEventListener("click", requestCurrentLocation);
    continueSampleButton.addEventListener("click", () => {
      applySampleLocation("카카오 API 발급 전 테스트를 위해 샘플 위치와 샘플 맛집 데이터로 시작합니다.");
    });
    backToLocationButton.addEventListener("click", () => showStage("location"));
    nextRecommendButton.addEventListener("click", nextCandidate);
    randomRecommendButton.addEventListener("click", randomCandidate);
    restartButton.addEventListener("click", resetToStart);

    renderCategories();
    syncLocationBanner();
    showStage("location");

    const stars = document.getElementById("stars");

    for (let index = 0; index < 80; index += 1) {
      const star = document.createElement("div");
      const size = Math.random() * 2.2 + 0.8;
      star.className = "star";
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty("--dur", `${Math.random() * 2.6 + 2.4}s`);
      star.style.animationDelay = `${Math.random() * 2.4}s`;
      stars.appendChild(star);
    }
