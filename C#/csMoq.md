Table of contents
[TOC] 

### Setup
As attrs in the test class
```
private Mock<ILogger<BookingsController>> _mockLogger;
private Mock<ILogger<BookingService>> _mockServiceLogger;
```
In the constructor of the test class
```
this._mockLogger = new Mock<ILogger<BookingsController>>();
this._mockServiceLogger = new Mock<ILogger<BookingService>>();
```

### Mocking with Moq
```
[Fact]
[Trait("Services", "PropertyRoomtypeService")]
public async Task GetAllAsync_FullSearch_ReturnsFullItemsList()
{
    // Arrange
    _mockRepo.Setup(r => r.FindAsync(It.IsAny<PropertyRoomTypeRequest>()))
        .ReturnsAsync(this._propertyRoomtypes);

    var _sut = new PropertyRoomtypeService(_mockRepo.Object, _logger.Object);

    // Act
    var propertyRoomtypesDto = await _sut.GetAllAsync(new PropertyRoomTypeRequest());

    // Assert
    Assert.Equal(this._propertyRoomtypes.Count, propertyRoomtypesDto.Count());

    foreach (var item in propertyRoomtypesDto)
    {
        Assert.IsType<PropertyRoomtypeDto>(item);
    }

    foreach (var item in this._propertyRoomtypes)
    {
        var elementFound = propertyRoomtypesDto.FirstOrDefault(x => x.OccupancyId == item.OccupancyId && x.PropertyId == item.PropertyId && x.RoomtypeId == item.RoomtypeId);
        Assert.NotNull(elementFound);
    }
}
```

### Configuration Mocking
As an attribute in the test class
```
private Mock<IOptionsMonitor<ProviderConfig>> _config;
```

In the test class constructor
```
public IntercompanyBookingsServiceTests()
{
    _config = new Mock<IOptionsMonitor<ProviderConfig>>();
    _config.Setup(x => x.Get(It.IsAny<string>())).Returns(
    new ProviderConfig()
        {
            IntercompanyCustomers = new Dictionary<string, List<int>>()
            {
                {  "DOTW" , new List<int>() { 123, 456, 789 } },
                {  "Jactravel" , new List<int>() { 123, 456, 789 } },
                {  "Sunhotels" , new List<int>() { 123, 456, 789 } },
            },
            IntercompanyBookingChannels = new Dictionary<string, List<int>>()
            {
                {  "DOTW" , new List<int>() { 123, 456, 789 } },
                {  "Jactravel" , new List<int>() { 123, 456, 789 } },
                {  "Sunhotels" , new List<int>() { 123, 456, 789 } },
            },
        }
    );
}
```

In the SUT initialization 
```
InterCompanyBookingsService sut = new InterCompanyBookingsService(_config.Object, _logger.Object);
```