class TokenService {
    private revokedTokens: Set<string> = new Set();

    // Revocar un token (logout)
    revokeToken(token: string): void {
        this.revokedTokens.add(token);
        console.log(`Token revocado. Total tokens revocados: ${this.revokedTokens.size}`);
    }

    // Verificar si un token está revocado
    isTokenRevoked(token: string): boolean {
        return this.revokedTokens.has(token);
    }

    // Limpiar tokens revocados (opcional, para mantenimiento)
    cleanupTokens(): void {
        this.revokedTokens.clear();
        console.log('Lista de tokens revocados limpiada');
    }
}

// Exportar una instancia única (Singleton)
export const tokenService = new TokenService();
