public class MovieTicketBooking {
    public static void main(String[] args) {
        String movie = "The Book of Life";
        int tickets = 3;
        int price = 250;
        int total = tickets * price;

        System.out.println("===== MOVIE BOOKING =====");
        System.out.println("Movie: " + movie);
        System.out.println("Tickets: " + tickets);
        System.out.println("Price per Ticket: ₱" + price);
        System.out.println("Total Payment: ₱" + total);
    }
}