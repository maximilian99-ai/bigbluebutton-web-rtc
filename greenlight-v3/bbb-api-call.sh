# BigBlueButton 서버의 주소
BBB_SERVER_URL="https://supratech.co.kr//bigbluebutton/api"
# 비밀번호(Secret)
BBB_SECRET="4tTpNuBjRbHRt2mQmB7DDYa3uIzeDOc6QbLnF3AQUUk"

# # 체크섬 생성
CHECKSUM=$(echo -n "getMeetings${BBB_SECRET}" | sha1sum | awk '{print $1}')

# # API 호출
curl "${BBB_SERVER_URL}/getMeetings?checksum=${CHECKSUM}"

