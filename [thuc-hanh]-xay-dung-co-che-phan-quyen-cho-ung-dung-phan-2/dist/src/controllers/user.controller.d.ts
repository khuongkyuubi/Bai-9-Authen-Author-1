declare const UserController: {
    (): void;
    register(req: any, res: any): Promise<any>;
    login(req: any, res: any): Promise<any>;
};
export default UserController;
