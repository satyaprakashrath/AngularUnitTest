import { StrengthPipe } from "./strength.pipe"

describe('Strength Pipe Test', () => {
    let strength = new StrengthPipe();
    it('should show weak when lenth is 5', ()=>{
        expect(strength.transform(5)).toBe('5 (weak)')
    })

    it('should show weak when lenth is 5', ()=>{
        expect(strength.transform(10)).toBe('10 (strong)')
    })
})