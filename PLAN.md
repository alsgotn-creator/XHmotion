# Noitom World — scroll-world 제작 기획

> 세션 재시작 후 이어서 작업하기 위한 인수인계 문서.
> 새 세션에서는 이 파일을 먼저 읽고 "Step 2부터 시작" 하면 됩니다.

## 한 줄 요약

모션 디자이너 **Noitom(민시훈)의 월드에 놀러온 사람을 환영하는** 스크롤 구동 랜딩 영상.
디즈니 애니메이션 12법칙 + 아이들링(idling)을 월드의 지형지물로 구현한 클레이 디오라마.

---

## 확정 사항

| 항목 | 값 |
|---|---|
| 주제 | Noitom의 모션 디자이너 월드 — 방문자 환영 |
| 아트 디렉션 | **클레이 디오라마** (소프트 매트 로우폴리, 아이소메트릭, 틸트시프트) |
| 카메라 | **3가지 혼용** (아래 표) |
| 텍스트 | **없음** — 사용자가 나중에 위에 얹음. 모든 프롬프트에 `no text, no letters, no logos` |
| 모바일 | **보류** (데스크탑만) |
| 티어 | **Draft** (`seedance_2_0_mini`, 720p) — 초안 |
| 스틸 소스 | ~~Codex~~ → **Higgsfield `gpt_image_2`** (아래 실측 참고) |
| 장면 수 | N = 6 |

### 브랜드킷

```
이름: Noitom      톤: cinematic, precise
--accent  #ff4d1c      (포트폴리오 포인트 컬러)
--ink     #141414
--paper   #ebebeb      ← 스틸 배경(BG_HEX)으로 사용
--black   #0d0d0d
--muted   #8a8a8a
--blue    #073bc7      (참고 파일 VANTA/LOOP에서)
```

---

## 캐릭터 — Noitom 아바타

사용자가 본인 사진을 주며 "캐릭터화해도 된다"고 함.
**사진을 `--image` 레퍼런스로 넘기지 않고, 아래 문구를 모든 장면 프롬프트에 그대로 재사용**합니다.
(스타일 프리앰블과 같은 원리 — 텍스트 고정이 월드 일관성을 만듭니다. 레퍼런스 이미지를 넘기면
장면이 복제되는 부작용이 있다고 스킬 문서가 경고.)

```
A small rounded clay-toy character: young Korean man, soft bowl-cut dark hair,
black turtleneck, calm friendly face, simple dot eyes, no text on clothing.
```

---

## 여정 6장 — 12법칙 + 아이들링 매핑

**아이들링은 전 장면 공통**: 멈춰 있는 것이 하나도 없음. 깃발·전구·나뭇잎·캐릭터 호흡이 미세하게 계속 움직임.

| # | 장면 | 담는 법칙 | 다이브 성격 |
|---|---|---|---|
| 1 | **환영의 문** Welcome Gate | Appeal, Staging, **Idling** | 고정 아이소 하강 |
| 2 | **바운스 광장** Bounce Plaza | Squash & Stretch, Exaggeration | 고정 아이소 하강 |
| 3 | **예비동작 언덕** Anticipation Hill | Anticipation, Timing | 하강 후 가로질러 활공 |
| 4 | **호의 다리** Arc Bridge | Arc, Follow Through & Overlapping | 하강 후 가로질러 활공 |
| 5 | **이징 계곡** Easing Valley | Slow In & Slow Out, Secondary Action | 표현적 스윕 다이브 |
| 6 | **작업실** The Studio | Solid Drawing, Straight Ahead & Pose to Pose, Appeal(피날레) | 표현적 스윕 다이브 |

### ⚠ 아키텍처 A → B 전환 (2026-11-01)

**전부 B(다이브인 + 공중 커넥터)로 통일했습니다.** 원래 1~4장을 A(끊김 없는 전진)로
잡았다가 두 번 실측하고 폐기했습니다:

| 시도 | 지시 | 결과 |
|---|---|---|
| leg0 1차 | "섬 안으로 들어가 캐릭터 쪽으로" | 캐릭터 가슴 클로즈업까지 파고듦 |
| leg0 2차 | "같은 거리 유지, 월드가 아래로 흘러감" | 섬을 지나쳐 날아가 멀리 점이 됨 |

**원인은 프롬프트가 아니라 소재입니다.** A는 *연속된 공간*(방→방, 거리→거리)을 전제하는데
우리 장면은 빈 배경에 떠 있는 **개별 섬**이라 섬 사이에 카메라가 지날 공간이 없습니다.
그래서 파고들거나 지나치거나 둘 중 하나밖에 안 됩니다. 스킬 문서도 디오라마/미니어처
월드에는 B를 쓰라고 명시하고 있었습니다.

요청받은 "카메라 3가지 번갈아"는 **다이브의 성격**으로 보존합니다(위 표 4열).
구조는 B로 통일되지만 움직임의 인상은 세 구간이 확실히 다릅니다.

폐기한 2차 시도는 버리고, **1차 시도는 다이브 모양 그대로라 `dive1`로 재활용**했습니다.

### 장면별 소품 (프롬프트 Subject에 들어갈 것)

1. **환영의 문** — 아치형 게이트, 환영 깃발, 종이 랜턴, 캐릭터가 손 흔듦, 발밑 둥근 잔디 섬
2. **바운스 광장** — 거대 고무공이 바닥에 눌려 납작해짐, 트램폴린, 늘어난 젤리 기둥, 캐릭터가 점프 중 스쿼시
3. **예비동작 언덕** — 당겨진 새총, 감긴 태엽 크랭크, 다이빙대 끝에서 웅크린 캐릭터, 메트로놈들
4. **호의 다리** — 곡선 레일, 진자 추, 캐릭터의 긴 목도리가 뒤로 흩날림, 뒤늦게 따라오는 깃발들
5. **이징 계곡** — 베지어 곡선 모양 언덕, 완만한 가속·감속 경사로, 걷는 캐릭터 + 따라 흔들리는 가방·머리카락
6. **작업실** — 모션 디자이너 책상, 3D 입체 도형들, 벽에 핀으로 꽂힌 키프레임 포즈 시트, 작업 중인 캐릭터. **CTA 오버레이 자리 비워둘 것**

---

## 스타일 프리앰블 (모든 장면에 그대로 재사용)

```
Isometric low-poly 3D diorama floating as a small rounded island on a plain solid
#ebebeb background with a soft contact shadow beneath it. Soft matte clay 3D render,
rounded toy-model shapes, gentle warm studio lighting, soft long shadows, tilt-shift
miniature look. Cohesive color palette of #ff4d1c, #141414, #ebebeb, #0d0d0d, #8a8a8a,
#073bc7. Highly detailed, centered composition, absolutely no text, no letters,
no numbers, no logos.
```

---

## 예산 (Draft 티어)

| 항목 | 수량 | 크레딧 |
|---|---|---|
| 스틸 (`gpt_image_2`) | 6 + 재생성 1 | **45.5** |
| 폐기된 A 캘리브레이션 | 2 | 16 |
| 다이브 (1장은 재활용) | 5 | 40 |
| 커넥터 | 5 | 40 |
| **합계** | | **~142** |

### 실측 기록

- **스틸 `gpt_image_2` 2k/high = 6.5 크레딧/장** (스킬 문서의 ~15보다 저렴)
- **영상 `seedance_2_0_mini` 720p/8초 = 8 크레딧, 2분 23초** (스킬 문서의 3~8분보다 빠름)
- 다이브는 각자 자기 스틸에서 출발하므로 **병렬 생성 가능**. 커넥터는 양끝 다이브의
  렌더된 프레임이 필요하므로 다이브 완료 후에 돌릴 것.

### ⚠ Codex 스틸 경로 사용 불가

`codex exec`로 `$imagegen`을 호출하면 다음과 같이 거부됨:

> I can't generate the image in this session because the built in image generation tool
> isn't available. The skill allows a CLI fallback that requires `OPENAI_API_KEY`.

codex v0.163.0 / ChatGPT 로그인 상태에서도 내장 image_gen을 못 씀. `OPENAI_API_KEY`가 있으면
CLI 폴백이 가능하다고 하나 키가 없음. **→ 스틸은 Higgsfield로 전량 생성** (어차피 한 소스로
통일해야 하므로 스타일 드리프트 문제도 없음).

---

## 환경 상태 (2026-10-31 확인)

| 항목 | 상태 |
|---|---|
| `higgsfield` CLI | v1.2.2 **인증 완료**, 워크스페이스 `aeab66f9-0aac-4b95-af57-d9107fcff1ab` (Private/plus) 선택됨 |
| 크레딧 | 1,034 |
| `ffmpeg` / `ffprobe` | OK (8.1.2) |
| `codex` | v0.163.0, ChatGPT 로그인됨 |
| PIL | 12.3.0 |
| scroll-world 플러그인 | `settings.json` 등록됨 — **재시작 후 설치됨** |

---

## 다음 단계

1. 재시작 후 `/plugin`으로 scroll-world 설치 확인
2. **Step 2** — Codex로 스틸 6장 생성 (크레딧 0)
   ```bash
   codex exec -C "$WORK" -s workspace-write --skip-git-repo-check \
     'Use the image generation tool ($imagegen) to generate: '"$(cat "$WORK/still_i.txt")"' Wide 3:2 landscape, high resolution. Save it as ./still_i.png. Do not do anything else.' \
     < /dev/null
   ```
   - 한 번에 전부 말고 몇 개씩 병렬, `< /dev/null` 필수
   - 6장이 하나의 월드로 읽히는지 **눈으로 검수** 후 진행
3. **Step 4** — 영상 체인. 1~4장 아키텍처 A(순차, 이전 레그의 실제 마지막 프레임을 `--start-image`로), 5~6장 B(다이브 + 커넥터)
4. **Step 6~8** — 인코딩, 페이지 조립, 이음매 QA

참고 문서는 GitHub에서 직접 받을 수 있음:
`https://raw.githubusercontent.com/oso95/scroll-world/main/skills/scroll-world/references/{prompts,pipeline}.md`
