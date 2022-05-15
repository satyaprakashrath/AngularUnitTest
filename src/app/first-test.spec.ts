describe('First Unit test', ()=>{
    let sut;
    beforeEach( ()=>{
        sut = {}
    })
    it('Should be true if true', ()=>{
        //AAA type test
        //Arrange
        sut.a = false;
        //Act
        sut.a = true;
        //Assert
        expect(sut.a).toBe(true);
    })
})