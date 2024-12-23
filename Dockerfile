FROM node:lts

WORKDIR /app

# Instalar o pnpm globalmente
RUN npm install -g pnpm

COPY . .

RUN pnpm install # Instalar as dependências com pnpm



RUN pnpm run build # Rodar o build com pnpm


EXPOSE 8080

CMD ["pnpm", "serve", "-s", "dist", "-l", "3000"]

