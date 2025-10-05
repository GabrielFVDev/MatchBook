import { useState, useEffect } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import Header from "../../components/Header";
import { Title } from "../../components/Title";
import { NotificationModal } from "../../components/NotificationModal";
import { useAuth } from "../../hooks/useAuth";
import { userService } from "../../apis/services";
import styles from "./styles.module.css";

export default function ProfilePage() {
    const { getCurrentUser } = useAuth();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setEditForm({
                id: currentUser.id,
                nome: currentUser.nome || '',
                email: currentUser.email || '',
                dataNascimento: currentUser.dataNascimento || '',
                generoFavorito: currentUser.generoFavorito || '',
                livrosLidos: currentUser.livrosLidos || 0,
                autorPreferido: currentUser.autorPreferido || '',
                nivelLeitura: currentUser.nivelLeitura || 'Iniciante',
                receberRecomendacoes: currentUser.receberRecomendacoes ?? true,
                biografia: currentUser.biografia || ''
            });
        }
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Se está cancelando, resetar o form
            setEditForm({
                id: user.id,
                nome: user.nome || '',
                email: user.email || '',
                dataNascimento: user.dataNascimento || '',
                generoFavorito: user.generoFavorito || '',
                livrosLidos: user.livrosLidos || 0,
                autorPreferido: user.autorPreferido || '',
                nivelLeitura: user.nivelLeitura || 'Iniciante',
                receberRecomendacoes: user.receberRecomendacoes ?? true,
                biografia: user.biografia || ''
            });
        }
    };

    const handleFormChange = (field, value) => {
        setEditForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        if (!editForm.nome || !editForm.email) {
            setNotification({
                type: 'error',
                title: 'Erro',
                message: 'Nome e email são obrigatórios!'
            });
            return;
        }

        setLoading(true);
        try {
            const response = await userService.atualizar(editForm);
            
            if (response.success) {
                setUser(response.data);
                setIsEditing(false);
                setNotification({
                    type: 'success',
                    title: 'Sucesso!',
                    message: 'Perfil atualizado com sucesso!'
                });
                
                // Atualizar dados no localStorage se necessário
                localStorage.setItem('usuario', JSON.stringify(response.data));
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            setNotification({
                type: 'error',
                title: 'Erro',
                message: 'Erro ao atualizar perfil: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const closeNotification = () => {
        setNotification(null);
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            // Aqui você pode implementar a API de exclusão
            // const response = await userService.deletar(user.id);
            
            setNotification({
                type: 'success',
                title: 'Conta deletada',
                message: 'Sua conta foi excluída com sucesso.'
            });
            
            // Limpar dados locais e redirecionar
            localStorage.removeItem('usuario');
            localStorage.removeItem('token');
            // Redirecionar para a página de login
            window.location.href = '/';
            
        } catch (error) {
            setNotification({
                type: 'error',
                title: 'Erro',
                message: 'Erro ao deletar conta: ' + error.message
            });
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    };

    const cancelDeleteAccount = () => {
        setShowDeleteModal(false);
    };

    if (!user) {
        return (
            <PageWrapper>
                <Header />
                <div className={styles.profileContainer}>
                    <div className={styles.loadingSpinner}>
                        Carregando perfil...
                    </div>
                </div>
            </PageWrapper>
        );
    }

    return (
        <>
            <PageWrapper>
                <Header />
                <div className={styles.profileContainer}>
                    <h1 className={styles.pageTitle}>Perfil do Leitor</h1>
                    <div className={styles.profileCard}>
                        {/* Cabeçalho do perfil */}
                        <div className={styles.profileHeader}>
                            <img 
                                src={user.fotoUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.nome) + "&background=d4a574&color=fff"} 
                                alt="Avatar do usuário"
                                className={styles.profileAvatar}
                            />
                            <div className={styles.profileInfo}>
                                <h2>{user.nome}</h2>
                                <p>{user.email}</p>
                            </div>
                        </div>

                        {/* Modo de visualização */}
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Data de Nascimento:</span>
                            <span className={styles.infoValue}>{user.dataNascimento || 'Não informado'}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Gênero Favorito:</span>
                            <span className={styles.infoValue}>{user.generoFavorito || 'Não informado'}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Autor Preferido:</span>
                            <span className={styles.infoValue}>{user.autorPreferido || 'Não informado'}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Nível de Leitura:</span>
                            <span className={styles.infoValue}>{user.nivelLeitura || 'Não informado'}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Receber Recomendações:</span>
                            <span className={styles.infoValue}>{user.receberRecomendacoes ? "Sim" : "Não"}</span>
                        </div>
                        {user.biografia && (
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Biografia:</span>
                                <span className={styles.infoValue}>{user.biografia}</span>
                            </div>
                        )}
                        <div className={styles.infoRow}>
                            <span className={styles.infoLabel}>Membro desde:</span>
                            <span className={styles.infoValue}>
                                {user.dataCadastro ? new Date(user.dataCadastro).toLocaleDateString('pt-BR') : 'Não informado'}
                            </span>
                        </div>

                        <div className={styles.statsContainer}>
                            <div className={styles.statBox}>
                                <h3>{user.livrosLidos || 0}</h3>
                                <p>Livros Lidos</p>
                            </div>
                        </div>

                        <div className={styles.actionButtons}>
                            <button className={styles.editButton} onClick={handleEditToggle}>
                                ✏️ Editar Perfil
                            </button>
                            <button className={styles.deleteButton} onClick={handleDeleteAccount}>
                                🗑️ Deletar Conta
                            </button>
                        </div>
                    </div>
                </div>

                <NotificationModal
                    isOpen={!!notification}
                    type={notification?.type || 'success'}
                    title={notification?.title || ''}
                    message={notification?.message || ''}
                    onClose={closeNotification}
                    autoClose={true}
                    autoCloseDelay={3000}
                />
            </PageWrapper>

            {/* Modal de Edição */}
            {isEditing && (
                <div className={styles.editModal} onClick={handleEditToggle}>
                    <div className={styles.editModalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.editModalHeader}>
                            <h2 className={styles.editModalTitle}>Editar Perfil</h2>
                            <button className={styles.closeButton} onClick={handleEditToggle}>
                                ×
                            </button>
                        </div>

                        <div className={styles.editForm}>
                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Nome *</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={editForm.nome}
                                    onChange={(e) => handleFormChange('nome', e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Email *</label>
                                <input
                                    type="email"
                                    className={styles.formInput}
                                    value={editForm.email}
                                    onChange={(e) => handleFormChange('email', e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Data de Nascimento</label>
                                <input
                                    type="date"
                                    className={styles.formInput}
                                    value={editForm.dataNascimento}
                                    onChange={(e) => handleFormChange('dataNascimento', e.target.value)}
                                />
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Gênero Favorito</label>
                                <select
                                    className={styles.formSelect}
                                    value={editForm.generoFavorito}
                                    onChange={(e) => handleFormChange('generoFavorito', e.target.value)}
                                >
                                    <option value="">Selecione um gênero</option>
                                    <option value="romance">Romance</option>
                                    <option value="ficção científica">Ficção Científica</option>
                                    <option value="fantasia">Fantasia</option>
                                    <option value="terror">Terror</option>
                                    <option value="mistério">Mistério</option>
                                    <option value="biografia">Biografia</option>
                                    <option value="história">História</option>
                                    <option value="autoajuda">Autoajuda</option>
                                    <option value="técnico">Técnico</option>
                                    <option value="clássico">Clássico</option>
                                </select>
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Autor Preferido</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    value={editForm.autorPreferido}
                                    onChange={(e) => handleFormChange('autorPreferido', e.target.value)}
                                    placeholder="Ex: Machado de Assis"
                                />
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Nível de Leitura</label>
                                <select
                                    className={styles.formSelect}
                                    value={editForm.nivelLeitura}
                                    onChange={(e) => handleFormChange('nivelLeitura', e.target.value)}
                                >
                                    <option value="Iniciante">Iniciante</option>
                                    <option value="Intermediário">Intermediário</option>
                                    <option value="Avançado">Avançado</option>
                                </select>
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Livros Lidos</label>
                                <input
                                    type="number"
                                    className={styles.formInput}
                                    value={editForm.livrosLidos}
                                    onChange={(e) => handleFormChange('livrosLidos', parseInt(e.target.value) || 0)}
                                    min="0"
                                />
                            </div>

                            <div className={styles.formRow}>
                                <label className={styles.formLabel}>Biografia</label>
                                <textarea
                                    className={styles.formInput}
                                    value={editForm.biografia}
                                    onChange={(e) => handleFormChange('biografia', e.target.value)}
                                    placeholder="Conte um pouco sobre seus gostos literários..."
                                    rows="3"
                                    style={{resize: 'vertical'}}
                                />
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formCheckbox}>
                                    <input
                                        type="checkbox"
                                        id="receberRecomendacoes"
                                        checked={editForm.receberRecomendacoes}
                                        onChange={(e) => handleFormChange('receberRecomendacoes', e.target.checked)}
                                    />
                                    <label htmlFor="receberRecomendacoes" className={styles.formLabel}>
                                        Receber Recomendações
                                    </label>
                                </div>
                            </div>

                            <div className={styles.buttonGroup}>
                                <button 
                                    className={styles.cancelButton} 
                                    onClick={handleEditToggle}
                                    type="button"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    className={styles.saveButton} 
                                    onClick={handleSave}
                                    disabled={loading}
                                    type="button"
                                >
                                    {loading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {showDeleteModal && (
                <div className={styles.deleteModal} onClick={cancelDeleteAccount}>
                    <div className={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.deleteModalHeader}>
                            <h2 className={styles.deleteModalTitle}>⚠️ Deletar Conta</h2>
                        </div>
                        
                        <div className={styles.deleteModalBody}>
                            <p>Tem certeza que deseja deletar sua conta?</p>
                            <p><strong>Esta ação não pode ser desfeita!</strong></p>
                            <p>Todos os seus dados, incluindo histórico de leituras e preferências, serão permanentemente removidos.</p>
                        </div>

                        <div className={styles.deleteModalButtons}>
                            <button 
                                className={styles.cancelDeleteButton} 
                                onClick={cancelDeleteAccount}
                                type="button"
                            >
                                Cancelar
                            </button>
                            <button 
                                className={styles.confirmDeleteButton} 
                                onClick={confirmDeleteAccount}
                                disabled={loading}
                                type="button"
                            >
                                {loading ? 'Deletando...' : 'Sim, Deletar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
