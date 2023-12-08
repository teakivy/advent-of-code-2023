defmodule Hand do
  def count_cards(hand) do
    Enum.reduce(String.codepoints(hand), %{}, fn char, acc ->
      Map.update(acc, char, 1, &(&1 + 1))
    end)
  end

  def process_hand(hand) do
    cards = count_cards(hand)
    type = case map_size(cards) do
      1 -> 6
      2 -> if Enum.any?(cards, fn {_, v} -> v == 4 end) do
             5
           else
             4
           end
      3 -> if Enum.any?(cards, fn {_, v} -> v == 3 end) do
             3
           else
             2
           end
      4 -> 1
      5 -> 0
    end
    type
  end

  def true_higher_card(card1, card2) do
    case card1 do
        "T" -> 10
        "J" -> 11
        "Q" -> 12
        "K" -> 13
        "A" -> 14
        _ -> String.to_integer(card1)
      end > case card2 do
        "T" -> 10
        "J" -> 11
        "Q" -> 12
        "K" -> 13
        "A" -> 14
        _ -> String.to_integer(card2)
      end
    end

  def higher_card(card1, card2) do
    if card1 == card2 do
      "same"
    else
      if true_higher_card(card1, card2) do
          "card1"
        else
          "card2"
        end
      end
  end

  def find_higher_hand(hand1, hand2) do
    if String.length(hand1) == 0 do
      true
    else
      case higher_card(String.at(hand1, 0), String.at(hand2, 0)) do
        "card1" -> true
        "card2" -> false
        "same" -> find_higher_hand(String.slice(hand1, 1..-1), String.slice(hand2, 1..-1))
      end
    end
  end

  def sort_hands(hands) do
    Enum.sort(hands, fn hand1, hand2 ->
      hand1_type = process_hand(hand1.hand)
      hand2_type = process_hand(hand2.hand)
      if hand1_type == hand2_type do
        !find_higher_hand(hand1.hand, hand2.hand)
      else
        hand1_type < hand2_type
      end
    end)
  end

  def total_winnings(hands) do
    hands |> Enum.with_index(1) |> Enum.map(fn {hand, index} ->
      hand.bid * index
    end) |> Enum.sum()
  end
end

file = File.read!("input.txt") |> String.replace("\r", "")

hands = String.split(file, "\n") |> Enum.map(fn x ->
  %{hand: String.split(x, " ") |> Enum.at(0),
  bid: String.split(x, " ") |> Enum.at(1) |> String.to_integer
  }
  end)

sorted_hands = Hand.sort_hands(hands)
winnings = sorted_hands |> Hand.total_winnings()
IO.puts "Part 1: #{winnings}"
