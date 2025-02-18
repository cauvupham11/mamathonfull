=======================================================================================================

# HOẠT ĐỘNG THĂNG CẤP

# 1. Sử dụng celenium của 1 tài khoản làm kho chứa vật phẩm onchain ( ITEM, FOOD, PET )

# 2. DEPLOY ITEM, FOOD, PET lên celenium mocha testnet (LƯU THÔNG TIN OFFCHAIN && ONCHAIN VỚI NHAU TRONG DATABASE)

# 3. Thực hiện các hoạt động (Feeding, Sleeping, Login...) thì sẽ tăng Exp

# 4. Sau khi tăng đủ số Exp thì sẽ nhắc người dùng thăng cấp cho Pet

# 5. Xảy ra 2 trường hợp khi thăng cấp Pet ?

# 5.1. Nếu thăng cấp ? Deploy data chứa Pet Lv n+1 : Giữ nguyên và không tăng level

=======================================================================================================

# HOẠT ĐỘNG BÁN

# 1. Xác định vật phẩm/thú cưng cần bán: Lấy thông tin từ cơ sở dữ liệu MongoDB dựa trên ID hoặc thuộc tính khác.

# 2. Tạo giao dịch bán: Tạo một blob chứa thông tin về vật phẩm/thú cưng và điều kiện bán (giá, thời hạn, v.v.).

# 3. Đăng tải blob lên mạng Celestia: Sử dụng phương thức (state.SubmitPayForBlob) để đăng tải blob chứa thông tin bán lên mạng.

=======================================================================================================

# HOẠT ĐỘNG MUA

# 1. Tìm kiếm vật phẩm/thú cưng cần mua: Truy vấn các blob trên mạng Celestia để tìm các giao dịch bán phù hợp.

# 2. Xác minh tính khả dụng của dữ liệu: Sử dụng phương thức share.SharesAvailable để đảm bảo rằng dữ liệu về giao dịch bán vẫn khả dụng trên mạng.

# 3. Thực hiện giao dịch mua: Tạo và đăng tải một blob chứa thông tin về giao dịch mua, bao gồm chi tiết thanh toán và xác nhận.

=======================================================================================================

# HOẠT ĐỘNG TRAO ĐỔI

# 1. Thỏa thuận trao đổi: Hai người chơi thỏa thuận về các vật phẩm/thú cưng sẽ được trao đổi.

# 2. Tạo giao dịch trao đổi: Mỗi người chơi tạo một blob chứa thông tin về vật phẩm/thú cưng của họ và điều kiện trao đổi.

# 3. Đăng tải blob lên mạng Celestia: Sử dụng phương thức blob.Submit để đăng tải các blob chứa thông tin trao đổi.

# 4. Xác minh và hoàn tất trao đổi: Cả hai bên xác minh thông tin và hoàn tất trao đổi bằng cách cập nhật cơ sở dữ liệu off-chain và on-chain.

// TIẾN ĐỘ //

=> LEVEL UP

- Dừng ở GET BLOB SUBMIT
- SAU KHI LẤY ĐƯỢC GET RỒI
- CHO ĂN
- TĂNG LEVEL

// FIX BUG //

- GET BLOB SUBMIT KHÔNG LẤY ĐƯỢC namespace, commitment
