import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { useNavigation } from '@react-navigation/native';
import { api } from "../lib/axios";
import { useEffect, useState } from 'react';
import Loading from './../components/Loading';
import  dayjs  from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDatesSize = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

type SummaryProps=Array<{
    id:string;
    date:string;
    amount:number;
    completed:number;
}>

export function Home() {
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<SummaryProps | null>(null)

    async function fetchData() {
        try {
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data);
        } catch (error) {
            Alert.alert('ops', 'nao foi possivel carregar');
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const { navigate } = useNavigation();


    useEffect(() => {
        fetchData();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, i) => (
                        <Text
                            style={{ width: DAY_SIZE }}
                            className="text-zinc-400 text-xl font-bold text-center mx-1" key={`${weekDay}-${i}`}>
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >

                { summary &&
                    <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => {
                                const dayWithHabits=summary.find(day=>{
                                    return dayjs(date).isSame(day.date,'day')
                                })
                            return (

                                <HabitDay
                                    date={date}
                                    amountOfHabits={dayWithHabits?.amount}
                                    amountCompleted={dayWithHabits?.completed}
                                    key={date.toString()}
                                    onPress={() => navigate('habit', { date: date.toISOString() })}
                                />

                            )
                        })
                    }
                    {
                        amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                            <View
                                key={i}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{ width: DAY_SIZE, height: DAY_SIZE }}
                            ></View>
                        ))
                    }
                </View>}
            </ScrollView>

        </View>
    )
}