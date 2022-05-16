import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent Test', ()=>{
    let heroComponent : HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(()=>{
        HEROES = [
            {id:1,name:'SuperKid', strength:8},
            {id:1,name:'WonderWoman', strength:55},
            {id:1,name:'SuperMan', strength:11}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes', 'deleteHero', 'addHero']);
        heroComponent = new HeroesComponent(mockHeroService);
    })

    it('should delete the hero passed in from the list', ()=>{
        heroComponent.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroComponent.delete(HEROES[2]);

        expect(heroComponent.heroes.length).toBe(2);
    })

    it('should call deleteHero with passed hero', ()=>{
        heroComponent.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroComponent.delete(HEROES[2]);

        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    })

    //Adding x before 'it' skips the test
    xit('should call deleteHero with passed hero and calls subscribe', ()=>{
        heroComponent.heroes = HEROES;
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroComponent.delete(HEROES[2]);

        ///expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        expect(mockHeroService.deleteHero.subscribe).toHaveBeenCalled();
    })

})