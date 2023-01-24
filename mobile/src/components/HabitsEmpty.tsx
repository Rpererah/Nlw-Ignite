import {Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
export function HabitsEmpty(){
    const {navigate}=useNavigation();
    return(
        <Text className='text-zinc-400 text-base'>
            Voce ainda nao esta monitorando nenhum habito {''}

            <Text onPress={()=>navigate('new')} className='text-violet-400 text-base underline active:text-violet-500'>
                Comece criando um habito.
            </Text>
        </Text>
    )
}