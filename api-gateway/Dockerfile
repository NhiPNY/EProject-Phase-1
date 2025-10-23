# Sử dụng Node.js phiên bản ổn định
FROM node:18

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json trước để tận dụng cache layer của Docker
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --production

# Copy toàn bộ mã nguồn vào container
COPY . .

# Đặt biến môi trường NODE_ENV = production
ENV NODE_ENV=production

# Mở port 5001 cho container
EXPOSE 3000

# Lệnh chạy chính
CMD ["node", "index.js"]
