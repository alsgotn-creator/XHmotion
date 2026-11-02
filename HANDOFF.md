# 인수인계 — 다른 PC에서 여기부터 이어가세요

> v1(73초)은 완성해서 돌려봤습니다. **v2 수정 요청이 들어온 상태**이고, 수정 내용이
> 사실상 전부 재생성이라 **생성된 영상·이미지는 커밋하지 않았습니다**(199MB).
> 프롬프트와 빌더 스크립트만 있으면 전부 다시 뽑을 수 있습니다.

---

## 0. 새 PC에서 환경 세팅 (10분)

```bash
# 1) 필수 CLI
npm install -g @higgsfield/cli      # 영상/이미지 생성
higgsfield auth login               # 브라우저 OAuth — 직접 실행해야 함
higgsfield workspace list           # SELECTED 에 체크 있는지 확인
# 체크 없으면: higgsfield workspace set <ID>

# 2) ffmpeg / ffprobe 가 PATH 에 있어야 함 (프레임 추출 + 인코딩)
ffmpeg -version

# 3) python + Pillow (포스터 생성, QA 비교용)
python -c "import PIL; print(PIL.__version__)"
```

Node는 빌더 스크립트(`.cjs`) 실행에만 씁니다. 별도 의존성 없음.

### 실측값 (v1 기준, 2026-10-31~11-01)

| 항목 | 모델/설정 | 비용 | 소요 |
|---|---|---|---|
| 스틸 | `gpt_image_2` 3:2 / 2k / high | **6.5 크레딧** | ~1분 |
| 영상 | `seedance_2_0_mini` 720p / 8초 | **8 크레딧** | **2분 23초** |

v1 총 사용: **126.5 크레딧**. 스킬 문서의 추정치(스틸 15, 영상 3~8분)보다 훨씬 저렴하고 빠릅니다.

> **Codex 스틸 경로는 못 씁니다.** `codex exec`로 `$imagegen`을 부르면
> "built in image generation tool isn't available, CLI fallback requires `OPENAI_API_KEY`"
> 로 거부됩니다. ChatGPT 로그인 상태여도 동일. 스틸은 Higgsfield로 전량 생성하세요.

---

## 1. v2 수정 요청 ← **여기가 다음 작업**

사용자 원문:

> 30초 영상으로 줄이고, 디자인과 관련되지 않은 에셋들은 전부 삭제해. 예를들어 새총이나,
> 다리, 길거리는 왜 나오는지 모르겠어. 그리고 배경을 활용해주던가 아예 메인 오브젝트들만
> 보이던가 한가지만해. 불필요한 줌,줌아웃은 없애고 한번만 활용해줘.

### 1-1. 길이: 73초 → **30초**

v1 구성은 다이브 6×8초 + 커넥터 5×5초 = 73초.

30초에 맞추는 계산 (택1, 미정 — 사용자 확인 필요):

| 안 | 구성 | 길이 |
|---|---|---|
| A | 다이브 4×5초 + 커넥터 3×3초 | 29초 |
| B | 다이브 6×4초 + 커넥터 5×1.2초 | 30초 — 커넥터가 너무 짧아 비권장 |
| C | 다이브 5×4초 + 커넥터 4×2.5초 | 30초 |

**A를 권합니다.** 장면을 6개 → 4개로 줄이면 "불필요한 에셋 삭제" 요구와도 맞아떨어집니다.
`seedance_2_0_mini`의 `duration`은 정수 파라미터라 5초/3초 모두 지정 가능합니다.

### 1-2. 디자인과 무관한 에셋 전부 제거

사용자가 **새총 · 다리 · 길거리**를 콕 집었습니다. v1은 디즈니 12법칙을 *물리적 은유*로
풀었는데(새총=예비동작, 아치형 다리=Arc), 그 은유가 **모션 디자인으로 안 읽히고 그냥
미니어처 소품**으로 보인 것입니다.

v1 스틸 프롬프트에 들어있던 제거 대상 — `stills/still_*.txt` 참고:

| 장면 | 빼야 할 것 |
|---|---|
| 1 환영의 문 | 한옥 게이트, 나무, 잔디, 징검다리, 바위, 꽃 |
| 2 바운스 광장 | 트램폴린, 랜턴, 깃발, 바위산 |
| 3 예비동작 언덕 | **새총**, 태엽 수레, 다이빙대, 나무, 폭포, 보트, 선착장 |
| 4 호의 다리 | **아치형 다리**, 석등, 분재, 물, 계단 |
| 5 이징 계곡 | **길/도로**, 난간 기둥, 나무, 연못 |
| 6 작업실 | 단풍나무, 분재, 랜턴, 돌담 |

**방향**: 법칙을 *풍경*이 아니라 **모션 디자인의 언어 자체**로 표현할 것.
키프레임, 그래프 에디터 곡선, 이징 커브, 타임라인 바, 스페이싱 차트, 모션 패스,
널 오브젝트, 셰이프 레이어 — 이런 게 디오라마의 주인공이어야 합니다.

### 1-3. 배경: **둘 중 하나만** 고를 것

> "배경을 활용해주던가 아예 메인 오브젝트들만 보이던가 한가지만해"

v1이 어중간했습니다 — 배경은 민무늬 `#ebebeb`인데 섬 위엔 잔디·나무·연못·랜턴이
잔뜩 있어서, 배경을 쓰는 것도 안 쓰는 것도 아니었습니다.

| 안 | 내용 | 영향 |
|---|---|---|
| **오브젝트 온리** (권장) | 민무늬 배경 + 떠 있는 오브젝트만. 섬/지형 자체를 없앰 | 1-2 요구와 자동으로 맞음. 프롬프트에서 "island/diorama" 제거 |
| 배경 활용 | 배경에 의미를 줌(그리드, 그래프 평면 등)하고 오브젝트를 그 위에 배치 | 월드감은 살지만 요소가 늘어 1-2와 충돌 |

### 1-4. 줌: **한 번만**

v1은 다이브 6개가 전부 "멀리서 → 파고들기"라 **6번 줌인 + 커넥터 5번 줌아웃 = 11번**
들락거렸습니다. 이게 피로합니다.

**제안 구조**: 전체에서 줌인 1회만.
- 오프닝에 한 번 들어가고
- 이후 장면 전환은 **수평 이동 / 디졸브 / 오브젝트 교체**로 처리
- 커넥터에서 "pulls up and back out, rising into the sky" 문구를 **빼야 합니다**
  (`video/c*.txt` 에 들어있음)

---

## 2. 리포 구조

```
noitom-world/
├── PLAN.md                  ← v1 전체 기획 + 실측 + 아키텍처 전환 기록
├── HANDOFF.md               ← 이 파일
├── build-prompts.cjs        ← 스틸 6장 프롬프트 생성 (프리앰블/캐릭터 고정)
├── build-video-prompts.cjs  ← 다이브 6 + 커넥터 5 프롬프트 생성
├── stills/
│   ├── still_1~6.txt        ← 생성된 스틸 프롬프트 (v1)
│   └── scenes.json          ← 장면 메타데이터
├── video/
│   ├── dive1~6.txt          ← 다이브 프롬프트 (v1)
│   ├── c12~c56.txt          ← 커넥터 프롬프트 (v1)
│   ├── leg0~3.txt           ← 폐기된 아키텍처 A 레그 (참고용, PLAN.md 참조)
│   └── chain.json           ← 체인 정의
├── site/
│   ├── index.html           ← 데모 페이지 (섹션 6 + 커넥터 5 결선)
│   └── scrub-engine.js      ← 스크롤 스크럽 엔진 (scroll-world 스킬 제공)
├── ref/                     ← scroll-world 스킬 문서 사본
│   ├── SKILL.md, prompts.md, pipeline.md, index-template.html, ...
└── docs/
    ├── v1-stills.webp       ← v1 스틸 6장 컨택트 시트
    └── v1-timeline.webp     ← v1 73초 통합본 타임라인
```

**`.gitignore` 된 것**: `*.mp4`, `stills/*.png`, `video/*.png`, `site/assets/`, `site/_qa/`
→ 전부 재생성 가능. v2는 어차피 새로 뽑습니다.

---

## 3. v1 재현 / v2 생성 명령

### 스틸

```bash
node build-prompts.cjs                     # stills/still_*.txt 재생성
cd stills
higgsfield generate create gpt_image_2 \
  --prompt "$(cat still_1.txt)" \
  --aspect_ratio 3:2 --resolution 2k --quality high \
  --wait --wait-timeout 15m --json > still_1.json
# result_url 을 curl 로 받아 still_1.png 로 저장
```

6장은 **동시에 돌려도 됩니다** (백그라운드 `&` + `wait`). v1에서 3분 걸렸습니다.

### 다이브 (각자 자기 스틸에서 출발 → 병렬 가능)

```bash
higgsfield generate create seedance_2_0_mini \
  --prompt "$(cat video/dive2.txt)" \
  --start-image "stills/still_2.png" \
  --resolution 720p --aspect_ratio 16:9 --duration 8 --generate_audio false \
  --wait --wait-timeout 15m --json > video/dive2.json
```

> `--generate_audio false` **필수**. 기본값이 `true`라 빼면 소리가 들어갑니다.

### 경계 프레임 → 커넥터

```bash
# 커넥터는 양끝이 "렌더된 영상"의 프레임이어야 함 (스틸 아님)
ffmpeg -ss 0        -i video/dive2.mp4 -frames:v 1 -q:v 2 video/dive2_first.png
ffmpeg -sseof -0.15 -i video/dive2.mp4 -frames:v 1 -q:v 2 video/dive2_last.png

higgsfield generate create seedance_2_0_mini \
  --prompt "$(cat video/c12.txt)" \
  --start-image video/dive1_last.png \
  --end-image   video/dive2_first.png \
  --resolution 720p --aspect_ratio 16:9 --duration 5 --generate_audio false \
  --wait --wait-timeout 15m --json > video/c12.json
```

### 스크러빙용 인코딩

```bash
ffmpeg -y -i video/dive1.mp4 -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart \
  site/assets/vid/dive1.mp4
```

GOP 8 = 키프레임을 촘촘히 박아 스크롤 시크가 부드러워집니다. 용량은 약간 늘어납니다.

### 통합본 + 로컬 미리보기

```bash
# site/concat.txt 에 file '...' 줄을 순서대로 쓰고
ffmpeg -y -f concat -safe 0 -i site/concat.txt -c copy site/noitom-world-draft.mp4

cd site && python -m http.server 8080 --bind 127.0.0.1
# http://127.0.0.1:8080/
```

---

## 4. 반드시 알고 가야 할 함정

1. **아키텍처 A는 이 소재에 못 씁니다.** 떠 있는 개별 섬 사이엔 카메라가 지날 공간이
   없어서, A(끊김 없는 전진)를 두 번 실측했더니 각각 *클로즈업까지 파고들기* / *섬을
   지나쳐 날아가기* 로 실패했습니다. 자세한 경위는 `PLAN.md`의 "아키텍처 A → B 전환" 절.
   → **B(다이브 + 커넥터)만 쓸 것.** 단 v2는 줌 1회 제약이 있어 커넥터 설계를 다시 해야 합니다.

2. **스타일 프리앰블과 캐릭터 묘사는 모든 장면에 바이트 단위로 동일**해야 합니다.
   이게 월드 일관성을 만드는 유일한 장치입니다 (`build-prompts.cjs`의 `PREAMBLE`/`CHARACTER`).

3. **사용자 사진을 `--image` 레퍼런스로 넘기지 마세요.** 장면이 복제됩니다.
   캐릭터는 텍스트 묘사로만 고정합니다.

4. **텍스트는 넣지 않습니다.** 사용자가 나중에 위에 얹을 예정이라 모든 프롬프트에
   `absolutely no text, no letters, no numbers, no logos` 가 들어 있습니다.
   `site/index.html`의 섹션들도 `eyebrow`/`title`/`body`를 비워뒀고, 엔진은 비면 렌더하지
   않습니다.

5. **로컬 서버는 세션이 끝나면 죽습니다.** 영상이 안 보인다면 십중팔구 서버가 꺼진 것이지
   파일 문제가 아닙니다. `site/noitom-world-draft.mp4` 는 서버 없이 바로 열립니다.

6. **모바일은 보류 상태**입니다. 네이티브 9:16 체인을 따로 뽑아야 하고 크레딧이 약 2배입니다.

---

## 5. 열린 질문 (v2 시작 전 사용자에게 확인)

1. 30초를 **장면 4개**로 줄일지, 6개를 유지하고 각 클립을 짧게 할지 — 위 1-1의 A/C 안
2. 배경: **오브젝트 온리**인지 **배경 활용**인지 — 위 1-3
3. 디즈니 12법칙을 계속 쓸지. 장면이 4개로 줄면 12개를 다 담을 수 없습니다.
   (예: 스쿼시&스트레치 / 이징 / 팔로스루 / 아이들링 4개로 압축)
4. 캐릭터(Noitom 아바타)를 계속 등장시킬지 — "메인 오브젝트만"이면 캐릭터도 뺄 수 있음
