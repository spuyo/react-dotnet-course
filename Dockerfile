FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

WORKDIR /src
COPY . .

RUN dotnet restore "./react_dotnet.csproj"
RUN dotnet publish "react_dotnet.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0

COPY --from=build /app/publish .

ENTRYPOINT [ "dotnet", "react_dotnet.dll" ]