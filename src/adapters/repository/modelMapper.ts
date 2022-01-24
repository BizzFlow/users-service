export default interface ModelMapper<T> {
	mapToCoreModel(element: any): T;
}
